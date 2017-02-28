#!/bin/sh
curl -s 'http://www.weatherlink.com/user/cokikite/index.php?view=main&headers=0' | \
ruby -ane 'puts Time.now, $F[2].match(/wrap.(\S+)&nbsp;(\d+)/)[1,2] if ~/KT<\/span><\/td>.*$/'
