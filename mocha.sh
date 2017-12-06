for file in *
do
  if [ "$file" == "node_modules" ];then
      continue
  fi

  if [ -d "$file" ];then
    if [ -d "$file/2017-12-06/project" ]; then
      echo "inside mocha $file ..."
      ./node_modules/.bin/mocha "$file/2017-12-06/project/test" || exit 1;
    fi
  fi
done
