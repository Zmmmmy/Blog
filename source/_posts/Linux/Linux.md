---
title: Linux
tags: Linux
categories:
  - Linux
cover: false
layout: post
abbrlink: 53d0684b
date: 2020-07-01 23:28:44
---

这是一篇关于Linux的笔记

<!-- more -->

# Linux

#### 一、Linux的目录结构

![image-20200608111010962](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608111010962.png)

#### 二、vi和vim编辑器

##### 三种模式

1.正常模式

* yy：拷贝当前行
* 5yy：拷贝向下的5行
* p：粘贴
* dd：删除当前行
* 5dd：删除向下的5行
* / + 关键字：输入n查找下一个，N查找上一个
* set nu,set nonu：显示/关闭行号
* u：撤销
* 20+G：移动到第20行
* gg：文首
* G：文底

2.插入模式

3.命令模式

#### 三、关机&重启

shutdown

* shutdown -h new：立即关机
* shutdown -h 1：表示1分钟后关机
* shutdown -r now：立即重启

halt

* 关机

reboot

* 重启

syn：

* 把内存的数据同步到磁盘



#### 四、登录&注销

注销：logout

更换用户：su -用户名

回到上一次用户：exit

当前用户：whoami



#### 五、用户管理

* useradd [选项] 用户名
  * -d：指定目录
* passwd 用户名：修改密码
* userdel 用户名 [选项] 用户名
  * -r：删除家目录
* 查询用户信息：
  * id 用户名

用户组

* groupadd 组名
* groupdel 组名

修改用户组

* useradd -g 组名 用户名
  * 新增用户直接添加用户组
* usermod -g 组名 用户名
  * 更改组



**/etc/password 文件**

用户(user)配置文件,记录用户的信息

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608091051017](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608091051017.png)



**/etc/shadow**

口令的配置文件

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608091827607](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608091827607.png)

用户名:加密口令:最后一次登录时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志

**/etc/group**

组的配置文件

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608111254123](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200608111254123.png)

组名:口令:组织标号:组内用户列表



#### 六、如何找回丢失的root密码

..................................以后再说吧.....................................

#### 七、文件目录

pwd：当前路径

* ls指令 [选项] 目录或文件
  * -a：显示所有
  * -l：列表显示
  * -h：习惯显示

* cd指令 [参数] 
  * cd ~：回到家目录
  * cd ..：回到上级目录

* mkdir [选项] 要创建的目录
  * -p：创建多级目录

* rmdir [选项] 删除空目录，只能删除空目录

* touch指令，创建一个空文件
  * touch 文件，文件.....

* cp指令：复制
  * cp [选项] 源文件 目标文件
    * -r(recursion)：递归复制，复制整个目录
    * \cp ：强制覆盖



* rm指令，移除目录或文件
  * -r：递归删除
  * -f：强制删除
* mv指令：移动文件&重命名
  * mv oldFile newFile
* cat指令：查看文件内容(只读)
  * cat [选项] 要查看的文件
    * -n：显示行号
    * cat -n 文件名 | more 分页显示，空格下一页，回车下一行 (管道命操作)
* more指令，分页查看
  * more 文件名
    * 快捷键：ctrl+b上一页，ctrl+f 下一页
* less指令，分屏查看，懒加载，查看大文件
  * / ：向上查找
  * ？：向下查找
  * q：离开程序
  * 快捷键
* \> 指令和>> 指令 
  * \> 输出重定向
  * \> > 追加
* echo控制台输出一句话
  * echo 内容 > 文件
  * echo 内容 >> 文件
  * echo $PATH：输入当前环境变量
* head指令：用于显示文件头部份内容(默认前十行)
  * head -n 5 文件： 指定显示5行文件内容
* tail指令：用于显示文件尾部内容(默认后五行)
  * tail -n 5 文件：指定显示5行文件内容
  * tail -f ：实时监控文件变化
* ln指令：创建软连接(类似快捷方式)
  *  ln -s 源目录 软连接
  *  ！+ 行数：执行本行指令 
* touch指令：创建空文件
* history指令：查看过去的指令



#### 八、时间日期类

* date显示当前日期
  * date "+%Y-%m-%d"：显示年月日
* cal以日历方式查看当前时间
  * cal [选项]

​			

#### 九、搜索查找类

* find指令 [搜索的范围] -name [搜索条件]：按名字搜索
* find指令 [搜索的范围] -size [搜索条件]：按名字搜索
  * +n：大于n的
  * -n：小于n的
  * n：等于n的
* locate指令：快速查找文件
  * 执行locate之前先执行updatedb更新linux是数据库
  * locate 要查找的文件名
* grep指令和管道符号 | ，表示将一个命令输出的结果传递给后面的指令，grep通常和管道符号“|”一同使用
  * cat 文件名 | grep -n/-ni 查找内容 ：查找内容并带行号(区分大小写/不区分大小写)



#### 十、压缩&解压缩

* gzip&gunzip
  * gzip 文件：压缩文件，不会保留源文件
  * gunzip 文件：解压文件
* zip&unzip
  * zip [选项] XXX.zip 压缩内容：压缩文件命名为XXX.zip
    * -r ：递归压缩，压缩整个目录
  * unzip [选项] ：解压缩
    * -d ：压缩到那个目录
* tar：
  * tar -zcvf 打包后的文件名 打包文件........
  * tar -zxvf 压缩文件 -C 解压目录：解压目录要存在



#### 十一、  组管理

* chown 用户名 文件名 ：修改文件所有者
* chgrp 所属组 文件名 ：修改文件所属组
* usermod -g 组名 用户名：修改用户所属组
* groupadd：添加组



#### 十二、权限管理

​		**\-     rw-     r--     r--**

* 第一位
  * \-  ：普通文件
  * d ：目录
  * l ：软连接
  * c ：字符设备
  * b ：块文件(硬盘...)
* 2~4位
  * 所属者权限
* 5~7位
  * 所属组权限
* 8~10位
  * 其他用户权限

**chmod：修改文件或目录的权限**

**chgrp：修改文件所在组**

​	chgrp 所属组 文件：改变文件所属组

* -R：递归修改，修改目录下所有文件所在组

#### 十三、定时任务调度

**crontab：定时任务调度设置**

-e：编辑定时任务调度，编写克隆表达式

-l：查询任务

-r：删除当前任务

service crond restart：重启任务调度

#### 十四、Linux洗盘分区和挂载

lsblk 、lsblk -f：查看所有设备挂载情况

> 1.分区命令fdisk /dev/sdb
>
> 开始对/sdb分区
> 	•m 显示命令列表
> 	•p 显示磁盘分区同fdisk –l
> 	•n 新增分区
> 	•d 删除分区
> 	•w 写入并退出
> 说明：开始分区后输入n，新增分区，然后选择p ，分区类型为主分区。两次回车默认剩余全部空间。最后输入w写入分区并退出，若不保存退出输入q。
>
> 2.格式化磁盘
> 分区命令:mkfs -t ext4 /dev/sdb1
> 其中ext4是分区类型
>
> 3.挂载: 将一个分区与一个目录联系起来，
> 	•mount 设备名称挂载目录
> 	•例如：mount /dev/sdb1 /newdisk
> 	•umount设备名称或者挂载目录
> 	•例如：umount/dev/sdb1 或者umount/newdis                                       	•用命令行挂载重启后会失效
>
> 4.永久挂载: 
>
> ​	通过修改/etc/fstab实现挂载
> ​	添加完成后执行mount –a 即刻生效
> ​	

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611213920389](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611213920389.png)

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611214136818](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611214136818.png)

* df  -h ：查询系统整体磁盘使用情况
* du -h /目录：
  * 查询指定目录的磁盘占用情况，默认为当前目录
  * -s指定目录占用大小汇总
  * -h 带计量单位
  * -a 含文件
  * --max-depth=1 子目录深度
  * -c 列出明细的同时，增加汇总值
* tree /目录：树状显示

#### 十五、网络设置

1、开启防火墙 
    systemctl start firewalld

2、开放指定端口
      firewall-cmd --zone=public --add-port=1935/tcp --permanent
 命令含义：
--zone #作用域
--add-port=1935/tcp  #添加端口，格式为：端口/通讯协议
--permanent  #永久生效，没有此参数重启后失效

3、重启防火墙
      firewall-cmd --reload

4、查看端口号
netstat -ntlp   //查看当前所有tcp端口·

netstat -ntulp |grep 1935   //查看所有1935端口使用情况·

netstat -anp 查看所以有开放端口

/etc/sysconfig/network-scripts/ifcfg-ens33：网络配置文件

5.监控网络状态

* 基本语法
  * netstat [选项]
  * 选项说明
    * -an 按一定顺序排列输出
    * -p 显示哪个进程在调用

#### 十六、进程管理

**ps：来查看目前系统中，有哪些正在执行**

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611215724442](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611215724442.png)

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611215719406](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611215719406.png)



> ps详解
>
> 1)指令：ps –aux|grep xxx ，比如我看看有没有sshd服务
> 2)指令说明,System V展示风格
> 	•USER：用户名称
> 	•PID：进程号
> 	•%CPU：进程占用CPU的百分比
> 	•%MEM：进程占用物理内存的百分比
> 	•VSZ：进程占用的虚拟内存大小（单位：KB）
> 	•RSS：进程占用的物理内存大小（单位：KB）
> 	•TT：终端名称,缩写.
> 	•STAT：进程状态，其中S-睡眠，s-表示该进程是会话的先导进程，N-表示进程拥有比普通优先级更低的优先级，R-正在运行，D-短期等待，Z-僵死进程，T-被跟踪或者被停止等等
> 	•STARTED：进程的启动时间
> 	•TIME：CPU时间，即进程使用CPU的总时间
> 	•COMMAND：启动进程所用的命令和参数，如果过长会被截断显示

**ps -ef是以全格式显示当前所有的进程**

* -e 显示所有进程。
* -f 全格式。
* ps -ef|grep xxx是BSD风格
* UID：用户ID
* PID：进程ID
* PPID：父进程ID
* C：CPU用于计算执行优先级的因子。数值越大，表明进程是CPU密集型运算，执行优先级会降低；数值越小，表明进程是I/O密集型运算，执行优先级会提高
* STIME：进程启动的时间
* TTY：完整的终端名称
* TIME：CPU时间
* CMD：启动进程所用的命令和参数

![https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611220500273](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/53d0684b/image-20200611220500273.png)

**pstree：查看进程树**

常用选项：
	-p :显示进程的PID
	-u :显示进程的所属用户

**top指令：**

top与ps命令很相似。它们都用来显示正在执行的进程。Top与ps最大的不同之处，在于top在执行一段时间可以更新正在运行的的进程。

* top [选项]
  * -d秒数：指定top命令每隔几秒更新。默认是3秒在top命令的交互模式当中可以执行的命令
  * -i：使top不显示任何闲置或者僵死进程。
  * -p：通过指定监控进程ID来仅仅监控某个进程的状态。
  * 操作
    * P：以CPU使用率排序，默认就是此项
    * M：以内存的使用率排序
    * N：以PID排序
    * q：退出top



#### 十七、RPM和YUM

###### RPM

介绍：
一种用于互联网下载包的打包及安装工具，它包含在某些Linux分发版中。它生成具有.RPM扩展名的文件。RPM是RedHat Package Manager（RedHat软件包管理工具）的缩写，类似windows的setup.exe，这一文件格式名称虽然打上了RedHat的标志，但理念是通用的。

查询已安装的rpm列表rpm –qa

rpm包的其它查询指令：
rpm -qa :查询所安装的所有rpm软件包
rpm -qa | more
rpm -qa | grep X [rpm -qa | grep firefox ]
rpm -q 软件包名:查询软件包是否安装
rpm -q firefox
rpm -qi 软件包名：查询软件包信息
rpm -qi file



卸载rpm包：
•基本语法
rpm -e RPM包的名称
•细节讨论
1) 如果其它软件包依赖于您要卸载的软件包，卸载时则会产生错误信息。
如：$ rpm -e foo
removing these packages would break dependencies:foo is needed by bar-1.0-1
2) 如果我们就是要删除foo这个rpm 包，可以增加参数--nodeps ,就可以强制删除，但是一般不推荐这样做，因为依赖于该软件包的程序可能无法运行
如：$ rpm -e --nodeps foo



安装rpm包：
•基本语法
rpm -ivh RPM包全路径名称
•参数说明
i=install 安装
v=verbose 提示
h=hash 进度条



**安装JDK：**

* 安装步骤
  1. 先将软件通过xftp5 上传到/opt 下
  2. 解压缩到/opt
  3. 配置环境变量的配置文件vim /etc/profile
     1.  JAVA_HOME=/opt/jdk1.7.0_79
     2.  PATH=/opt/jdk1.7.0_79/bin:$PATH
     3.  export JAVA_HOME PATH
  4. 启动tomcat ./startup.sh



#### 十九、服务的启动和停止

systemctl start firewalld

systemctl stop firewalld



systemctl [command] [unit]

* command 主要有：
  * start：立刻启动后面接的 unit。
  * stop：立刻关闭后面接的 unit。
  * restart：立刻关闭后启动后面接的 unit，亦即执行 stop 再 start 的意思。
  * reload：不关闭 unit 的情况下，重新载入配置文件，让设置生效。
  * enable：设置下次开机时，后面接的 unit 会被启动。
  * disable：设置下次开机时，后面接的 unit 不会被启动。
  * status：目前后面接的这个 unit 的状态，会列出有没有正在执行、开机时是否启动等信息。
  * is-active：目前有没有正在运行中。is-enable：开机时有没有默认要启用这个 unit。
  * kill ：不要被 kill 这个名字吓着了，它其实是向运行 unit 的进程发送信号。
  * show：列出 unit 的配置。
  * mask：注销 unit，注销后你就无法启动这个 unit 了。
  * unmask：取消对 unit 的注销。









## Linux(补充)

----

开启防火墙 systemctl start firewalld.service 

防火墙开机启动 systemctl enable firewalld.service 

关闭防火墙 systemctl stop firewalld.service 

查看防火墙状态 firewall-cmd --state 

重载防火墙配置 firewall-cmd --reload 

添加单个单端口 firewall-cmd --permanent --zone=public --add-port=81/tcp 

添加多个端口 firewall-cmd --permanent --zone=public --add-port=8080-8083/tcp 

删除某个端口 firewall-cmd --permanent --zone=public --remove-port=81/tcp 

针对某个 IP开放端口 firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.142.166" port protocol="tcp" port="6379" accept" firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.233" accept"  

删除某个IP firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.1.51" accept" 

针对一个ip段访问 firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.0/16" accept" firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.1.0/24" port protocol="tcp" port="9200" accept" 

添加操作后别忘了执行重载 firewall-cmd --reload

重启防火墙

systemctl restart firewalld

端口列表

firewall-cmd --list-all



重启网卡：service network restart



































































































































