CMD="./node_modules/nyc/bin/nyc.js --check-coverage --lines 100 --functions 95 --branches 95 ./node_modules/.bin/mocha"

for file in *
do
  if [ "$file" == "node_modules" ];then
      continue
  fi

  if [ -d "$file" ];then
    if [ -d "$file/2017-12-06/project" ]; then
      echo "inside mocha $file ..."
      $CMD "$file/2017-12-06/project/test" || exit 1;
    fi
    if [ -d "$file/2017-12-06/hanoi" ]; then
      echo "inside hanoi coverage $file ..."
      $CMD "$file/2017-12-06/hanoi/test" || exit 1;
    fi
    if [ -d "$file/2017-12-07/session" ]; then
      echo "inside session coverage $file ..."
      $CMD "$file/2017-12-07/session/test" || exit 1;
    fi

  fi
done
