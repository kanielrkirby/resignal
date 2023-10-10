sqlcipher_cmd="";

IFS=: read -ra binary_paths <<< "$PATH"

function get_cmd() {
    possibles=( "$@" );
    for name in "${possibles[@]}"; do
        if command -v "$name" >/dev/null 2>&1; then
            echo "$name";
            return 0;
        fi
        for path in "${binary_paths[@]}"; do
            if [ -f "$path/$name" ]; then
                echo "$path/$name";
                return 0;
            fi
        done
    done
    if [ -n "$1" ]; then
        echo "Command $1 not found";
        echo "Please install $1 before running this script";
        exit 1;
    fi
}

function get_dir() {
  possibles=( "$@" );
  for name in "${possibles[@]}"; do
    if [ -d "$name" ]; then
      echo "$name";
      return 0;
    fi
  done
}

# Variables
sqlcipher_cmd=$(get_cmd sqlcipher sqlcipher3);
jq_cmd=$(get_cmd jq);
signal_dir=$(get_dir ~/.config/Signal ~/Library/Application\ Support/Signal ~/AppData/Roaming/Signal);
key=$( $jq_cmd -r '."key"' "${signal_dir}/config.json" );
db="${signal_dir}/sql/db.sqlite";
msgs="./messages.json";

# Get messages
$sqlcipher_cmd -list -noheader "$db" "PRAGMA key = \"x'"$key"'\";select json from messages;" > "$msgs";

if [ "$(head -n 1 "$msgs")" = "ok" ]; then
    tail -n +2 "$msgs" > "$msgs.tmp";
    mv "$msgs.tmp" "$msgs";
fi

sed -i -e '1s/^/[/; $s/$/]/; $!s/$/,/' "$msgs";

rm -f "$msgs.tmp" "$msgs-e";

echo "Messages saved to $msgs";

# now we need to get the database data (contacts, groups, etc)
# key is the same

conversations="./conversations.json";

$sqlcipher_cmd -list -noheader "$db" "PRAGMA key = \"x'"$key"'\";SELECT json FROM conversations;" > "$conversations";

if [ "$(head -n 1 "$conversations")" = "ok" ]; then
    tail -n +2 "$conversations" > "$conversations.tmp";
    mv "$conversations.tmp" "$conversations";
fi

sed -i -e '1s/^/[/; $s/$/]/; $!s/$/,/' "$conversations";

rm -f "$conversations.tmp" "$conversations-e";

echo "Conversations saved to $conversations";
