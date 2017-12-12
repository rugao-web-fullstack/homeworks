CMD="./node_modules/nyc/bin/nyc.js --check-coverage --lines 100 --functions 95 --branches 95 ./node_modules/.bin/mocha"
declare -a dirs=('/2017-12-06/project' '/2017-12-06/hanoi' '/2017-12-07/session' '/2017-12-07/mail')


for file in *
do
  if [ "$file" == "node_modules" ];then
      continue
  fi

  if [ -d "$file" ];then
    for dir in "${dirs[@]}"
    do
      if [ -d "$file$dir/test" ];then
        echo "inside mocha $file $dir";
        $CMD "$file$dir/test" || exit 1;
      fi 
    done
  fi
done
