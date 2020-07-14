#!/bin/bash
a=`grep devappid config.sh | awk -F\" '{print $4}'`
b=`grep appid dist/dev/mp-weixin/project.config.json | tail -1 | awk -F\" '{print $4}'`
echo $a
echo $b
sed -i "" "s/$b/$a/g" dist/dev/mp-weixin/project.config.json
