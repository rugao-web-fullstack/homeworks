for file in *
do
  if [ "$file" == "node_modules" ];then
      continue
  fi
  if [ -d "$file" ];then
    echo "inside $file ..."
    ./node_modules/.bin/eslint $file;
  fi
done
