# HLS协议

介绍一下HLS协议，这个协议是由苹果公司提出并推广开来的。来一段维基百科的定义。

> **HTTP Live Streaming**（缩写是**HLS**）是一个由[苹果公司](https://zh.wikipedia.org/wiki/%E8%8B%B9%E6%9E%9C%E5%85%AC%E5%8F%B8)提出的基于[HTTP](https://zh.wikipedia.org/wiki/HTTP)的[流媒体](https://zh.wikipedia.org/wiki/%E6%B5%81%E5%AA%92%E4%BD%93)[网络传输协议](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)。是苹果公司[QuickTime X](https://zh.wikipedia.org/w/index.php?title=QuickTime_X&action=edit&redlink=1)和[iPhone](https://zh.wikipedia.org/wiki/IPhone)软件系统的一部分。它的工作原理是把整个流分成一个个小的基于HTTP的文件来下载，每次只下载一些。当媒体流正在播放时，客户端可以选择从许多不同的备用源中以不同的速率下载同样的资源，允许流媒体会话适应不同的数据速率。在开始一个流媒体会话时，客户端会下载一个包含元数据的[extended M3U (m3u8)](https://zh.wikipedia.org/w/index.php?title=Extended_M3U&action=edit&redlink=1)[playlist](https://zh.wikipedia.org/w/index.php?title=Playlist&action=edit&redlink=1)文件，用于寻找可用的媒体流。
> HLS只请求基本的HTTP报文，与[实时传输协议（RTP)](https://zh.wikipedia.org/wiki/%E5%AE%9E%E6%97%B6%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)不同，HLS可以穿过任何允许HTTP数据通过的[防火墙](https://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E5%A2%99)或者[代理服务器](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8)。它也很容易使用[内容分发网络](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9C)来传输媒体流。
> 苹果公司把HLS协议作为一个[互联网草案](https://zh.wikipedia.org/w/index.php?title=Internet-Draft&action=edit&redlink=1)（逐步提交），在第一阶段中已作为一个非正式的标准提交到[IETF](https://zh.wikipedia.org/wiki/IETF)。但是，即使苹果偶尔地提交一些小的更新，IETF却没有关于制定此标准的有关进一步的动作。[[1\]](https://zh.wikipedia.org/wiki/HTTP_Live_Streaming#cite_note-1)

## 协议简介

HLS协议规定：

- 视频的封装格式是TS。
- 视频的编码格式为H264,音频编码格式为MP3、AAC或者AC-3。
- 除了TS视频文件本身，还定义了用来控制播放的m3u8文件（文本文件）。

为什么苹果要提出HLS这个协议，其实他的主要是为了解决RTMP协议存在的一些问题。比如RTMP协议不使用标准的HTTP接口传输数据，所以在一些特殊的网络环境下可能被防火墙屏蔽掉。但是HLS由于使用的HTTP协议传输数据，不会遇到被防火墙屏蔽的情况（该不会有防火墙连80接口都不放过吧）。

另外于负载，RTMP是一种有状态协议，很难对视频服务器进行平滑扩展，因为需要为每一个播放视频流的客户端维护状态。而HLS基于无状态协议（HTTP），客户端只是按照顺序使用下载存储在服务器的普通TS文件，做负责均衡如同普通的HTTP文件服务器的负载均衡一样简单。

另外HLS协议本身实现了码率自适应，不同带宽的设备可以自动切换到最适合自己码率的视频播放。其实HLS最大的优势就是他的亲爹是苹果。苹果在自家的[iOS](http://lib.csdn.net/base/ios)设备上只提供对HLS的原生支持，并且放弃了flash。[Android](http://lib.csdn.net/base/android)也迫于平果的“淫威”原生支持了HLS。这样一来flv，rtmp这些Adobe的视频方案要想在移动设备上播放需要额外下点功夫。当然flash对移动设备造成很大的性能压力确实也是自身的问题。

但HLS也有一些无法跨越的坑，比如采用HLS协议直播的视频延迟时间无法下到10秒以下，而RTMP协议的延迟最低可以到3、4秒左右。**所以说对直播延迟比较敏感的服务请慎用HLS**。

![img](http://upload-images.jianshu.io/upload_images/1328846-39f999dab36167db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



图片来源于苹果官网

来解释一下这张图，从左到右讲，左下方的inputs的视频源是什么格式都无所谓，他与server之间的通信协议也可以任意（比如RTMP），总之只要把视频数据传输到服务器上即可。这个视频在server服务器上被转换成HLS格式的视频（既TS和m3u8文件）文件。细拆分来看server里面的Media encoder的是一个转码模块负责将视频源中的视频数据转码到目标编码格式（H264）的视频数据，视频源的编码格式可以是任何的视频编码格式（参考[《视频技术基础》](http://www.jianshu.com/p/c905f3ec59c9%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F%E7%AB%A0%E8%8A%82)）。转码成H264视频数据之后，在stream segmenter模块将视频切片，切片的结果就是index file（m3u8）和ts文件了。图中的Distribution其实只是一个普通的HTTP文件服务器，然后客户端只需要访问一级index文件的路径就会自动播放HLS视频流了。

## HLS的index文件

所谓index文件就是之前说的m3u8文本文件。

![img](http://upload-images.jianshu.io/upload_images/1328846-d0df01e6b2dec3bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



图片来源于苹果官网

如上图所示，客户端播放HLS视频流的逻辑其实非常简单，先下载一级Index file，它里面记录了二级索引文件（Alternate-A、Alternate-B、Alternate-C）的地址，然后客户端再去下载二级索引文件，二级索引文件中又记录了TS文件的下载地址，这样客户端就可以按顺序下载TS视频文件并连续播放。

### 主索引 :

直播源 : `http://dlhls.cdn.zhanqi.tv/zqlive/30647_JIjP2.m3u8`

```cpp
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:PROGRAM-ID=1,PUBLISHEDTIME=1462118775,CURRENTTIME=1462155858,BANDWIDTH=400000,RESOLUTION=854x480
30647_JIjP2_400/index.m3u8?Dnion_vsnae=30647_JIjP2
#EXT-X-STREAM-INF:PROGRAM-ID=1,PUBLISHEDTIME=1462118776,CURRENTTIME=1462155858,BANDWIDTH=700000,RESOLUTION=1280x720
30647_JIjP2_700/index.m3u8?Dnion_vsnae=30647_JIjP2
#EXT-X-STREAM-INF:PROGRAM-ID=1,PUBLISHEDTIME=1462118775,CURRENTTIME=1462155858,BANDWIDTH=1024000,RESOLUTION=1280x720
30647_JIjP2_1024/index.m3u8?Dnion_vsnae=30647_JIjP2
```

每一个标签的格式, 属性, 作用,请参考[这里](https://link.jianshu.com?t=http://tools.ietf.org/html/draft-pantos-http-live-streaming)

------

**#EXTM3U**
 每个M3U文件第一行必须是这个tag，请标示作用

**#EXT-X-VERSION**
 用以标示协议版本。(到我写这篇文章为止,HLS协议已经经历了19个版本了,既然这里是3, 那么这里用的就是HLS协议第三个版本)此标签只能有0或1个，不写代表使用版本1。

**#EXT-X-STREAM-INF**
 `#EXT-X-STREAM-INF的格式 :`
 `#EXT-X-STREAM-INF : [attribute=value][,attribute=value]* <URI>`
 标签的属性列表中直接指明当前流是VIDEO还是AUDIO
 属性 :

1. BANDWIDTH              指定码率
2. PROGRAM-ID            唯一ID (这个属性在后面的协议版本废除了)
3. CODECS                    指定流的编码类型

**#EXT-X-MEDIA-SEQUENCE:1462118775 **每一个media URI 在 PlayList中只有唯一的序号，相邻之间序号+1, 一个media URI并不是必须要包含的，如果没有，默认为0

```cpp
#EXTM3U
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXTINF:10,
2000kbps-00001.ts
#EXTINF:10,
2000kbps-00002.ts
#EXTINF:10,
2000kbps-00003.ts
#EXTINF:10,
2000kbps-00004.ts
#EXTINF:10,
... ...
#EXTINF:10,
2000kbps-00096.ts
#EXTINF:10,
2000kbps-00097.ts
#EXTINF:10,
2000kbps-00098.ts
#EXTINF:10,
2000kbps-00099.ts
#EXTINF:10,
2000kbps-00100.ts
#ZEN-TOTAL-DURATION:999.66667
#ZEN-AVERAGE-BANDWIDTH:2190954
#ZEN-MAXIMUM-BANDWIDTH:3536205
#EXT-X-ENDLIST
```

二级文件实际负责给出ts文件的下载地址，这里同样使用了相对路径。#EXTINF表示每个ts切片视频文件的时长。#EXT-X-TARGETDURATION指定当前视频流中的切片文件的最大时长，也就是说这些ts切片的时长不能大于#EXT-X-TARGETDURATION的值。#EXT-X-PLAYLIST-TYPE:VOD的意思是当前的视频流并不是一个直播流，而是点播流，换句话说就是该视频的全部的ts文件已经被生成好了，#EXT-X-ENDLIST这个表示视频结束，有这个标志同时也说明当前的流是一个非直播流。

### 子索引 :

根据上面的主索引文件,这里我选择了,1024, 码率为1024000的数据源, 将URL拼接一下, 得到下面的URL
 `http://dlhls.cdn.zhanqi.tv/zqlive/30647_JIjP2_1024/index.m3u8?Dnion_vsnae=30647_JIjP2`

结果 :

```cpp
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:5647
#EXT-X-TARGETDURATION:10
#EXTINF:9.560,
1462167932532_1462167932532.ts?Dnion_vsnae=30647_JIjP2
#EXTINF:6.520,
1462167942133_1462167942133.ts?Dnion_vsnae=30647_JIjP2
#EXTINF:9.960,
1462167948685_1462167948685.ts?Dnion_vsnae=30647_JIjP2
```

传说已久的.ts文件已经看到, 这些就是视频数据源文件,解释一下标签的作用

**#EXT-X-MEDIA-SEQUENCE**
 每一个media URI 在 PlayList中只有唯一的序号，相邻之间序号+1
 (上面那个URL, 不断请求的过程中能不断获取子索引, 每一次获取下来的都能发现EXT-X-MEDIA-SEQUENCE会不断增大)

**#EXT-X-TARGETDURATION:10**
 每一份媒体文件的时间, 以秒为单位, 这里是10秒一份

**#EXTINF **
 格式 #EXTINF <duration>,<title>
 每一份媒体文件的详细信息, duration : 媒体持续时间, 应该四舍五入为整数,上面的例子,9.560就是这一份媒体文件的持续时间
 title : 1462167932532_1462167932532.ts?Dnion_vsnae=30647_JIjP2这个是这一份媒体文件的URL地址,

## 播放模式

- **点播VOD**的特点就是当前时间点可以获取到所有index文件和ts文件，二级index文件中记录了所有ts文件的地址。这种模式允许客户端访问全部内容。上面的例子中就是一个点播模式下的m3u8的结构。
- **Live** 模式就是实时生成M3u8和ts文件。它的索引文件一直处于动态变化的，播放的时候需要不断下载二级index文件，以获得最新生成的ts文件播放视频。如果一个二级index文件的末尾没有#EXT-X-ENDLIST标志，说明它是一个Live视频流。

客户端在播放VOD模式的视频时其实只需要下载一次一级index文件和二级index文件就可以得到所有ts文件的下载地址，除非客户端进行比特率切换，否则无需再下载任何index文件，只需顺序下载ts文件并播放就可以了。但是Live模式下略有不同，因为播放的同时，新ts文件也在被生成中，所以客户端实际上是下载一次二级index文件，然后下载ts文件，再下载二级index文件（这个时候这个二级index文件已经被重写，记录了新生成的ts文件的下载地址）,再下载新ts文件，如此反复进行播放