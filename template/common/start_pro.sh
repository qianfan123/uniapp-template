#!/bin/bash
a=`grep productappid config.sh | awk -F\" '{print $4}'`
b=`grep appid dist/build/mp-weixin/project.config.json | tail -1 | awk -F\" '{print $4}'`
echo $a
echo $b
sed -i "" "s/$b/$a/g" dist/build/mp-weixin/project.config.json
