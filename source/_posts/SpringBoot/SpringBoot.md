---
title: SpringBoot
categories:
  - Spring
tags: Spring
cover: false
layout: post
abbrlink: 6f2612a2
date: 2020-07-01 23:28:44

---

这是一篇关于SpringBoot的笔记

<!-- more -->

#### 一、SpringBoot启动类的加载

---

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509003942759](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509003942759.png)



#### 二、配置文件

---

##### 1.配置文件

SpringBoot使用一个全局的配置文件，配置文件名字是固定的

* application.properties
* application.yaml

配置文件的作用：修改SpringBoot自动配置的默认值

##### 2.YAML(YML)

1. 格式

```yml
key:
  key: value
```

2. 值的写法

* 字符串默认不用加单引号或双引号
* 如果加上
  * " "：双引号，不会转义字符串的特殊字符，特殊字符会表达出本身的意思
  * ‘  ’ ：单引号，会表达出字符串的意思

---

对象、map的写法

```yml
person:
  name: zmy
  age: 25
```

行内写法

```yml
person: {name: zmy,age: 25}
```

----

数组（List、Set）

```yml
list:
  - num1
  - num2
  - num3
```

行内写法

```yml
list: [unm1,num2,num3]
```

---

将配置文件而的值映射到组件中

JavaBean

```java
@Data //lombok注解
@ToString //lombok注解
@Component //将本类加载进Spring容器
@Validated //JSR303数据校验
@ConfigurationProperties(prefix = "person") //告诉SpringBoot将本类中所有属性和配置文件进行绑定
public class Person {
    private String name;
    private int age;
    private ArrayList<String> phone;
    private HashMap<String,String> like;
}
```

yml配置文件（idae会有提示，需要加入依赖）

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-configuration-processor</artifactId>
	<optional>true</optional>
</dependency>
```

yml

```yml
person:
  name: zmy
  age: 25
  phone:
    - iPhone
    - XiaoMi
  like:
    game: LOL
    guitar: YAMAHA
```

properties

```properties
person.name=zmy
person.age=25
person.phone=iPhone,XiaoMi
person.like.play=LOL
person.like.guitar=YAMAHA
```



##### 3.@ConfigurationProperties  和  @Value

|                | @ConfigurationProperties |   @Value   |
| -------------- | :----------------------: | :--------: |
| 功能           | 批量注入配置文件中的属性 | 一个个指定 |
| 松散绑定       |           支持           |   不支持   |
| SpEL           |          不支持          |    支持    |
| JSR303数据校验 |           支持           |   不支持   |
| 复杂类型封装   |           支持           |   不支持   |

@ConfigurationProperties

````java
@Data
@ToString
@Component
@PropertySource("classpath:person.properties")
@ConfigurationProperties( prefix = "person" )
//@Validated
public class Person {
    private String name;
    private int age;
    private ArrayList<String> phone;
    private HashMap<String,String> like;
}
````



@Value

````java
@Data
@ToString
@Component
@PropertySource("classpath:person.properties") //引入指定资源
public class Person {
    @Value("${person.name}") 
    private String name;
    @Value("#{24+1}") //SpEL表达式
    private int age;
    private ArrayList<String> phone;
    private HashMap<String,String> like;
}
````



##### 4.@PropertySource	和	@ImportResource

@PropertySource：导入指定资源

```java
@Data
@ToString
@Component
@PropertySource("classpath:person.properties")	//引入指定资源
@ConfigurationProperties( prefix = "person" )
//@Validated
public class Person {
    private String name;
    private int age;
    private ArrayList<String> phone;
    private HashMap<String,String> like;
}
```



@ImportResource：导入配置文件

```java
@SpringBootApplication /.//SpringBoot启动类
@ImportResource("classpath:beans.xml") //导入指定配置文件
public class SpringbootDemo01Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootDemo01Application.class, args);
    }

}
```



##### 5.SpringBoot推荐给容器中添加组件的方式



###### 全注解方式

@Configuration：表明当前是一个配置类，代替之前的Spring配置文件

@Bean：将当前的返回值添加到容器中

```java
@Configuration
public class MyAppConfig {
    //将当前方法的返回值添加到容器中
    //容器中组件的id就是当前方法名
    @Bean
    public HelloDemo helloDemo(){
        System.out.println("Bean给容器中添加组件了");
        return new HelloDemo();
    }
}
```



##### 6.配置文件占位符

```properties
person.name=钟明原${random.uuid} 随机数
person.age=25
person.phone=iPhone,XiaoMi
person.like.play=${person.game:LOL}_CS:GO 引用值，并给定默认值
person.like.guitar=${person.like.play}&YAMAHA 引用值
```



##### 7.Profile多环境

###### 1.多Profile文件

我们在编写配置类的时候，文件名可以是  application-{profile}.properties/yml

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509094256248](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509094256248.png)

``` properties
server.port=8080
spring.profiles.active=dev	激活该环境
```

###### 2.yml支持多文档块方式

```yml
server:
  port: 8080
spring:
  profiles:
    active: dev
---
server:
  port: 8083
spring:
  profiles: dev
---
server:
  port: 8084
spring:
  profiles: prop
```

###### 3.激活指定的profile

**1.使用设置**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509095717102](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509095717102.png)



**2.使用命令行**

先打包

java -jar springboot-demo01-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509100243226](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509100243226.png)

**3.使用虚拟机参数**

-Dspring.profiles.active=dev

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509100534631](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509100534631.png)



###### 4.配置文件加载位置

- file: ./config/
- file: ./
- file: classpath:/config
- file: classpath:/  （默认）

优先级由高到低，高优先级的配置会覆盖低优先级的配置。并且会==互补配置==

还可以通过命令行参数的方式指定配置文件

先打包

```sh
java -jar spring-boot-config-0.0.1-SNAPSHOT.jar 
--spring.config.additional-location=D:/application.properties 
```

###### 5.外部配置文件加载顺序

1.命令行参数

```shell
java -jar spring-boot-config-0.0.1-SNAPSHOT.jar 
--server.port=8089 
--server.servlet.context-path=/test
```

2.外部和内部的配置文件

==由jar外向jar包内进行寻找==

==优先加载带profiles的配置文件==

1.jar包外部的application-{profiles}.properties/.yml

2.jar内外部的application-{profiles}.properties/.yml

==再加载不带profiles的配置文件==

1.jar包外部的application.properties/.yml

2.jar内外部的application.properties/.yml



#### 三、SpringBoot的自动配置

---

spring-boot-starter-xxxxx：**导入组件所需要的依赖**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509135646515](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509135646515.png)



###### **1.META-INF/spring.factories下的文件**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509135937329](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509135937329.png)



###### **2.xxxAutoConfiguration**

每一个xxxAutoConfiguration类都是容器中的一个组件，用他们来做自动配置

以**HttpEncodingAutoConfiguration**为例解释自动配置原理

```java
//表示这是一个自动配置类
@Configuration(proxyBeanMethods = false) 
//启用指定类的@ConfigurationProperties功能，将配置文件中的值和HttpProperties绑定起来，并把HttpProperties加入到容器中
@EnableConfigurationProperties(HttpProperties.class) 
//组合疏注解，底层是@Conditiona注解，根据不同条件，如果满足条件，整个配置类里的配置就会生效
//判断当前是否为web应用，如果是，当前配置类生效
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
//判断当前是否有CharacterEncodingFilter类
//CharacterEncodingFilter---->SpringMVC中解决乱码的过滤器
@ConditionalOnClass(CharacterEncodingFilter.class)
//判断配置文件中置否存在某个配置：spring.http.encoding.enabled,如果不存在判断也是成立的
//即使不配置也是默认生效的：spring.http.encoding.enabled=true
@ConditionalOnProperty(prefix = "spring.http.encoding", value = "enabled", matchIfMissing = true)
public class HttpEncodingAutoConfiguration {
    //他已经和SPringBoot配置文件映射了
    private final HttpProperties.Encoding properties;
   	//只有一个有参构造器，参数就会从容器中拿到
	public HttpEncodingAutoConfiguration(HttpProperties properties) {
		this.properties = properties.getEncoding();
	}

    //给容器中添加一个组件，这个组件的值，需要从properties获取
    @Bean
    //在该组件不存在时生效
	@ConditionalOnMissingBean
	public CharacterEncodingFilter characterEncodingFilter() {
		CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
		filter.setEncoding(this.properties.getCharset().name());
		filter.setForceRequestEncoding(this.properties.shouldForce(Type.REQUEST));
		filter.setForceResponseEncoding(this.properties.shouldForce(Type.RESPONSE));
		return filter;
	}


```

==根据当前不同条件判断，决定这个配置类是否生效==

一旦配置类生效，这个配置类就会为容器添加各种组件，这些组建的属性是从对应的==xxxxProperties==类中获取的

###### **3.xxxxProperties**

xxxxProperties类又和配置文件时绑定的

所有在配置文件中配置的属性都在xxxxProperties类中封装着，配置文件可以配置什么就可以参考对应这个属性

**HttpProperties**

```java
@ConfigurationProperties(prefix = "spring.http")
public class HttpProperties {

```



###### **4.精髓**&总结

* SpringBoot启动会加载大量的自动配置类
* 首先看我们需要的功能SpringBoot有没有自动配置
* 再来看自动配置类到底配置了那些组件，如果配置了我们需要的组件，就不需要再配置了
* 给容器中的自动配置类添加组件的时候，会从xxxxProperties类中获取某些属性。我们就可以在配置文件中指定这些属性的值

**xxxxAutoConfiguration**：自动配置类给容器中添加组件

**xxxxProperties**：封装了配置文件中相关的属性



###### 5.@Conditional派生注解

@Conditional派生注解（Spring注解版原生的@Conditional作用）
作用：必须是@Conditional指定的条件成立，才给容器中添加组件，配置配里面的所有内容才生效；

| @Conditional扩展注解            | 作用（判断是否满足当前指定条件）                 |
| ------------------------------- | ------------------------------------------------ |
| @ConditionalOnJava              | 系统的java版本是否符合要求                       |
| @ConditionalOnBean              | 容器中存在指定Bean；                             |
| @ConditionalOnMissingBean       | 容器中不存在指定Bean；                           |
| @ConditionalOnExpression        | 满足SpEL表达式指定                               |
| @ConditionalOnClass             | 系统中有指定的类                                 |
| @ConditionalOnMissingClass      | 系统中没有指定的类                               |
| @ConditionalOnSingleCandidate   | 容器中只有一个指定的Bean，或者这个Bean是首选Bean |
| @ConditionalOnProperty          | 系统中指定的属性是否有指定的值                   |
| @ConditionalOnResource          | 类路径下是否存在指定资源文件                     |
| @ConditionalOnWebApplication    | 当前是web环境                                    |
| @ConditionalOnNotWebApplication | 当前不是web环境                                  |
| @ConditionalOnJndi              | JNDI存在指定项                                   |



###### 6.自动配置报告

通过debug=true属性查看配置情况

```properties
#开启SpringBoot的debug
debug=true
```



#### 四、日志

##### **1.市面上的日志框架**

JUL、JCL、Jboss-logging、logback、log4j、log4j2、slf4j....

| 日志门面  （日志的抽象层）                                   | 日志实现                                             |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| ~~JCL（Jakarta  Commons Logging）~~    SLF4j（Simple  Logging Facade for Java）    **~~jboss-logging~~** | Log4j  JUL（java.util.logging）  Log4j2  **Logback** |

左边选一个门面（抽象层）、右边来选一个实现；

日志门面：  SLF4J；

日志实现：Logback；



SpringBoot：底层是Spring框架，Spring框架默认是用JCL；

**==SpringBoot选用 SLF4j和logback；==**



##### 2.SEL4J的使用

---

###### 1.如何在系统中使用SLF4J

以后在开发的时候，不应该直接调用日志的实现类，而是调用日志抽象层里面的方法

给系统里导入slf4j的jar和logback的实现jar

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(HelloWorld.class);
    logger.info("Hello World");
  }
}
```

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509170730760](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509170730760.png)

每一个日志的实现框架都有自己的配置文件。使用slf4j以后，配置文件还是要导入**具体实现框架的配置文件**

###### 2.统一日志

在一个项目中可能存在多个框架这就导致了多个日志框架一起使用的情况

比如Spring用的是Commons-logging，Hibernate用的是jboss-logging.........

如何统一日志，即使是别的框架也和我使用同一个日志框架呢

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509174048235](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509174048235.png)

如何让系统中所有的日志都统一到**slf4j**

1. 将系统中的其他日志框架先排除出去
2. 用中间包替换原有的日志框架
3. 导入slf4j的实现框架

###### 3.SpringBoot日志关系

SpringBoot最基本模块

````xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
      <version>2.2.7.RELEASE</version>
      <scope>compile</scope>
</dependency>
````

SpringBoot日志功能启动器

```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-logging</artifactId>
      <version>2.2.7.RELEASE</version>
      <scope>compile</scope>
</dependency>
```

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509222107687](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200509222107687.png)

**总结**

1. SpringBoot底层原理使用的是slf4j+logback的方式进行日志记录
2. SpringBoot也把其他日志替换成了slf4j
3. 中间替换包



##### 3.日志的使用

```java
@SpringBootTest
class SpeingBootLogApplicationTests {
    //
    Logger logger = LoggerFactory.getLogger(getClass());
	@Test
	void contextLoads() {
	    //日志的级别
        //由低到高：trace<debug<info<warn<error
        //可以调整输出日志的级别，日志就会在这个级别以后的高级别生效
        logger.trace("这是trace日志");
        logger.debug("这是debug日志");
        /.//SpringBoot默认使用的是info级别的，也就是root级别
        logger.info("这是info日志");
        logger.warn("这是warn日志");
        logger.error("这是error日志");
    }

}
```

配置文件

```properties
#设置日志级别
logging.level.com.zmy=trace
#可以指定路径和log文件的名字
#不能与logging.file.path同时使用
logging.file.name=springboot1.log
#不能指定log的名字, 使用缺省值spring.log
#不能与logging.file.name同时使用
#/代表文件磁盘根目录
#logging.file.path=.//SpringBootDemo3/
#在控制台输出日志的格式
logging.pattern.console=%d{yyyy-MM-dd} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] - %msg%n
#在文件输出日志的格式
logging.pattern.file=%d{yyyy-MM-dd} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] -%msg%n

```

    -->
    %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
    日志输出格式：
    	%d表示日期时间，
    	%thread表示线程名，
    	%-5level：级别从左显示5个字符宽度
    	%logger{50} 表示logger名字最长50个字符，否则按照句点分割。 
    	%msg：日志消息，
    	%n是换行符

日志配置文件

| Logging System          | Customization                                                |
| :---------------------- | :----------------------------------------------------------- |
| Logback                 | `logback-spring.xml`,`logback-spring.groovy`,`logback.xml`,`logback.groovy` |
| Log4j2                  | `log4j2-spring.xml` or `log4j2.xml`                          |
| JDK (Java Util Logging) | `logging.properties`                                         |

`logback.xml`：直接被日志框架识别

`logback-spring.xml`：日志框架不加载该文件，由SpringBoot加载，可以使用SpringBoot的高级功能

SpringBoot日志高级功能

```xml
<springProfile name="dev">
    <pattern>输出格式</pattern>
</springProfile>
<springProfile name="!dev">
    <pattern>输出格式</pattern>
</springProfile>
```

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510005103429](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510005103429.png)



#### 五、Web开发

---

**WebMvcAutoConfiguration.java**

**WebMvc自动配置类**

##### 1.SpringBoot对静态资源的映射规则

**public enum StaticResourceLocation-------->静态资源的通用位置的枚举类**

**getResourceLocations-------->获取资源位置**

**addResourceHandlers-------->添加资源处理程序**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510111835774](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510111835774.png)

###### 1.第一种映射规则

classpath:/META-INF/resources/webjars/

webjars:SpringBoot是通过jar的打包方式，所以静态资源可以以jar包的方式引入

在pom.xml添加依赖

```xml
<!--引入jquery的webjars-->
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>jquery</artifactId>
    <version>3.5.1</version>
</dependency>
```

webjar的结构

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510113257181](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200510113257181.png)

###### 2.第二种映射规则

/**  ：访问当前项目任何资源（静态资源文件夹）

任何资源如果没人处理就在一下资源目录寻找

```
classpath:/META-INF/resources/"
"classpath:/resources/"
"classpath:/static/"
"classpath:/public/
"/":当前项目的根路径
```

比如：localhost:8080/abc  就等于去静态资源文件夹里找abc

###### 3.资源设置类

ResourceProperties.java：

资源设置类：可以对资源进行设置

```java
//可以设置和资源有关的设置
@ConfigurationProperties(prefix = "spring.resources", ignoreUnknownFields = false)
public class ResourceProperties {
```

```xml
spring.resources.static-locations=设置静态资源路径
```



##### 2.欢迎页映射

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511001808591](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511001808591.png)



##### 3.模板引擎

JSP、Velocity、Freemarker、Thymeleaf........

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511002914699](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511002914699.png)



SpringBoot推荐使用Thymeleaf



###### 1.引入Thymeleaf

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

ThymeleafProperties配置类

加载classpath:/templates/xxxxx.html下的文件

```java
@ConfigurationProperties(prefix = "spring.thymeleaf")
public class ThymeleafProperties {
   private static final Charset DEFAULT_ENCODING = StandardCharsets.UTF_8;
   public static final String DEFAULT_PREFIX = "classpath:/templates/";
   public static final String DEFAULT_SUFFIX = ".html";
```



###### 2.使用Thymeleaf

引入命名空间

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org">
```



###### 3.Thymeleaf语法规则

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511013130844](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511013130844.png)



```properties
Variable Expressions: ${...}	
#获取变量值
#获取对象属性、调用方法
#使用内置对象
								
Selection Variable Expressions: *{...}
#变量选择表达式
#功能上和${...}一样
#配合th:object使用
<div th:object="${session.user}">
	<p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
	<p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
	<p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>

Message Expressions: #{...}
#获取国际化内容

Link URL Expressions: @{...}
#定义url

Fragment Expressions: ~{...}
#引用表达式

Text literals: , ,…'one text''Another one!'
Number literals: , , , ,…0343.012.3
Boolean literals: , truefalse
Null literal: null
Literal tokens: , , ,…onesometextmain

String concatenation: +
Literal substitutions: |The name is ${name}|
Arithmetic operations:
Binary operators: , , , , +-*/%
Minus sign (unary operator): -

Binary operators: , andor
Boolean negation (unary operator): , !not
Comparisons and equality:
Comparators: , , , (, , , ><>=<=gtltgele)
Equality operators: , (, ==!=eqne)
Conditional operators:
If-then: (if) ? (then)
If-then-else: (if) ? (then) : (else)
Default: (value) ?: (defaultvalue)
Special tokens:
No-Operation: _
```

[[标签内容]]：不转义

[(标签内容)]：转义

###### 4.重定向与转发

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200512154105180](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200512154105180.png)



##### 4.Spring MVC自动配置

Spring MVC核心组件

DispatcherServlet：调度器

ViewResolver：视图解析器



**Spring MVC Auto-configuration**

以下是SpringBoot对SpringMVC的自动配置

- Inclusion of `ContentNegotiatingViewResolver` and `BeanNameViewResolver` beans.

  - 自动配置了ViewResolver（视图解析器，根据返回值返回视图对象）

  - ContentNegotiatingViewResolver ：组合所有视图解析器

  - 如何定制：我们可以自己给容器中添加一个视图解析器==添加到容器==ContentNegotiatingViewResolver 就会自动的将其组合进来      验证：--------->DispatcherServlet-------->doDispatch，查看是否加入

  - ```java
    @Bean
    public ViewResolver myViewResolver(){
        return new MyViewResolver();
    }
    private static class MyViewResolver implements ViewResolver{
    
        @Override
        public View resolveViewName(String viewName, Locale locale) throws Exception {
            return null;
        }
    }
    ```

  - ![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111601533](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111601533.png)

- Support for serving static resources, including support for WebJars (covered [later in this document](https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content))).

  - 静态资源文件夹路径，webjars

- Automatic registration of `Converter`, `GenericConverter`, and `Formatter` beans.

  - 自动注册了Converter（转换器），Formatter（格式化器）
  - ==自己添加Converter（转换器），Formatter（格式化器），只需要自己**将组件注册进容器中**==
  - ![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111629174](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111629174.png)

- Support for `HttpMessageConverters` (covered [later in this document](https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-message-converters)).

  - HttpMessageConverters：SpringMVC用来转换HTTP请求和响应的------>User----JSON
  - 从容其中获取所有的HttpMessageConverters
  - ==自己添加HttpMessageConverters，只需要自己将**组件注册进容器中**==

- Automatic registration of `MessageCodesResolver` (covered [later in this document](https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-message-codes)).

- Static `index.html` support.

- Custom `Favicon` support (covered [later in this document](https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-favicon)).

- Automatic use of a `ConfigurableWebBindingInitializer` bean (covered [later in this document](https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-web-binding-initializer)).

  - 我们可以配置一个ConfigurableWebBindingInitializer来替换默认的
  - 初始化WebDataBinder
    - 请求数据绑定到JavaBean上
  - ![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111742436](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511111742436.png)



###### 1.==扩展SpringMVC==

If you want to keep those Spring Boot MVC customizations and make more [MVC customizations](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web.html#mvc) (interceptors, formatters, view controllers, and other features), you can add your own `@Configuration` class of type `WebMvcConfigurer` but **without** `@EnableWebMvc`.

如果要保留这些Spring Boot MVC定制并进行更多的MVC定制（拦截器，格式化程序，视图控制器和其他功能），则可以添加自己的类型为==WebMvcConfigurer==的@Configuration类，但不添加@EnableWebMvc。

If you want to provide custom instances of `RequestMappingHandlerMapping`, `RequestMappingHandlerAdapter`, or `ExceptionHandlerExceptionResolver`, and still keep the Spring Boot MVC customizations, you can declare a bean of type `WebMvcRegistrations` and use it to provide custom instances of those components.

如果要提供RequestMappingHandlerMapping，RequestMappingHandlerAdapter或ExceptionHandlerExceptionResolver的自定义实例，并且仍然保留Spring Boot MVC自定义，则可以声明WebMvcRegistrations类型的Bean，并使用它提供这些组件的自定义实例。

If you want to take complete control of Spring MVC, you can add your own `@Configuration` annotated with `@EnableWebMvc`, or alternatively add your own `@Configuration`-annotated `DelegatingWebMvcConfiguration` as described in the Javadoc of `@EnableWebMvc`.

如果要完全控制Spring MVC，可以添加带有@EnableWebMvc注释的自己的@Configuration，或者添加自己的@Configuration注释的DelegatingWebMvcConfiguration，如@EnableWebMvc的Javadoc中所述。



**例子**：

SpringMVC配置拦截器和视图控制器

```xml
<!--视图控制器-->
<mvc:view-controller path="/hello" view-name="success"></mvc:view-controller>
<!--拦截器-->
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/hello"/>
        <bean></bean>
    </mvc:interceptor>
</mvc:interceptors>
```

==**SpringBoot扩展方式**==

编写一个配置类（@Configuration），是==WebMvcConfigurer==类型的，不能标注@EanableWebMvc

```java
//视图控制器
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {
    //添加视图解析器
    //将/zmy映射到success
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/zmy").setViewName("success");
    }
}
```



###### 2.SpringMVC的自动配置原理

WebMvcAutoConfiguration是SpringMVC的自动配置类

WebMvcAutoConfigurationAdapter：Web Mvc自动配置适配器

```java
@Configuration(proxyBeanMethods = false)
@Import(EnableWebMvcConfiguration.class)
@EnableConfigurationProperties({ WebMvcProperties.class, ResourceProperties.class })
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer {
```

@Import(EnableWebMvcConfiguration.class)

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511144948441](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511144948441.png)

效果：有的WebMVC的配置一起起作用



###### 3.全面接管SpringBootMVC

SpringBoot对SpringMVC的自动配置都不需要了，所有的都是自己来配置

If you want to take complete control of Spring MVC, you can add your own `@Configuration` annotated with `@EnableWebMvc`, or alternatively add your own `@Configuration`-annotated `DelegatingWebMvcConfiguration` as described in the Javadoc of `@EnableWebMvc`.

如果要完全控制Spring MVC，可以添加带有@EnableWebMvc注释的自己的@Configuration，或者添加自己的@Configuration注释的DelegatingWebMvcConfiguration，如@EnableWebMvc的Javadoc中所述。

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511151239267](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511151239267.png)



##### ==5.如何修改SpringBoot的默认配置==

**org.springframework.boot.autoconfigure.web：**web的所有自动配置场景；

模式：

1. SpringBoot在自动配置类，先看容器中有没有用户自己注册进去的组件		（@ConditionalOnMissingBean），如果有就用用户配置的，没有就自动配置。如果有组件可以有多个就将用户配置的，和默认配置的结合起来（ViewResolver）
2. 在SpringBoot中有非常多的xxxxConfigurer帮助我们进行扩展配置，比如==WebMvcConfigurer==
3. 在SpringBoot中有非常多的xxxxCustomizer帮助我们进行定制配置，比如==WebServerFactoryCustomizer==



#### 六、RestfulCRUD

---

##### 1.默认访问首页（视图控制器）

视图控制器

须在WebMvc配置类添加

```java
@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/index.html").setViewName("index");
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/main.html").setViewName("dashboard");
    }
```



##### 2.国际化

1. 编写国际化配置文件
2. 使用ResourceBundleMessageSource管理国际化资源文件
3. 在页面使用fmt:message取出国际化内容

**步骤：**

1. 编写国际化配置文件，抽取页面要显示的国际化消息

国际化配置文件

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511175647814](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511175647814.png)

2. SpringBoot已经自动配置好了ResourceBundleMessageSource国际化资源管理组件

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511194641641](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200511194641641.png)

3. 在页面获取国际化内容：使用#{.........}获取国际化内容
4. 根据浏览器语言设置页面语言
   * 原理：
     * Locale（区域信息对象），
     * LocaleResolver（语言环境解析器）

```java
//WebMvcAutoConfiguration.java
@Bean
@ConditionalOnMissingBean  //判断是否有该组件
@ConditionalOnProperty(prefix = "spring.mvc", name = "locale")
public LocaleResolver localeResolver() {
    //判断，如果mvcProperties（mvc配置文件里的getLocaleResolver）等于LocaleResolver.FIXED（固定的），使用固定的值
   if (this.mvcProperties.getLocaleResolver() == WebMvcProperties.LocaleResolver.FIXED) {
      return new FixedLocaleResolver(this.mvcProperties.getLocale());
   }
    //使用请求头中的国际化信息
   AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
   localeResolver.setDefaultLocale(this.mvcProperties.getLocale());
   return localeResolver;
}
//如果请求头没有带国际化信息就用默认的
//请求头带了信息，就用请求头的
```



##### 3.登录页面

开发期间模板引擎修改以后，要实时生效

1. Ctrl+F9重新编译页面
2. 禁用模板引擎的缓存：spring.thymeleaf.cache=false



##### 4.拦截器

1. 实现HandlerInterceptor接口
2. 在WebMvc配置类里添加拦截器
3. 拦截器会过滤静态资源，需放行



```java
public class LoginHandlerInterceptor implements HandlerInterceptor {
    //目标方法执行之前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse 	response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        Object user = session.getAttribute("user");
        if (user==null){
            request.setAttribute("msg","没有权限");
            request.getRequestDispatcher("/index.html").forward(request,response);
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    //目标方法执行之后
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
```

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")
    .excludePathPatterns("/index.html","/index","/","/user/login","/asserts/**");
}
```



##### 5.Restful风格

**路径格式：URI:/资源名称/资源标识**

|      |           普通           |      Restful      |
| :--: | :----------------------: | :---------------: |
| 查询 |          getXXX          |     XXX---GET     |
| 添加 |        addXXX?xxx        |    XXX---POST     |
| 修改 | updateXXX?id=xxx&xxx=xxx |  XXX/{id}---PUT   |
| 删除 |     deleteXXX?id=xxx     | XXX/{id}---DELETE |

实验要求的请求架构

|                      | 请求URI  | 请求方式 |
| :------------------- | :------: | :------: |
| 查询所有员工         |   emps   |   GET    |
| 查询某个员工         | emp/{id} |   GET    |
| 来到添加页面         |   emp    |   GET    |
| 添加员工             |   emp    |   POST   |
| 来到修改页面（回显） | emp/{id} |   GET    |
| 修改                 |   emp    |   PUT    |
| 删除员工             | emp/{id} |  DELETE  |



##### 6.发送PUT,DELETE请求

1. 表单的提交方式为POST
2. 有"_method"的标签
3. type="hidden"
4. value为请求方式

```html
<input type="hidden" name="_method" value="put" th:if="${emp!=null}">
```

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200512170300499](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200512170300499.png)





#### 七、错误页面

---

**可以参考ErrorMvcAutoConfiguration错误处理自动配置**

给容器中添加了以下组件

1. DefaultErrorAttributes

   帮我们在页面共享信息,可以用这些属性定制页面

   ```html
   <h1>status：[[${status}]]</h1>
   <h1>timestamp：[[${timestamp}]]</h1>
   ```

   1. timestamp：时间戳
   2. status：状态码
   3. error：错误提示
   4. exception：异常对象
   5. message：异常消息
   6. errors：JSR303数据校验的错误

2. BasicErrorController

   基本错误视图控制器，注册错误视图，往里面加错误信息

3. ErrorPageCustomizer

   错误页面定制器，寻找错误页面位置

4. DefaultErrorViewResolver

   寻找匹配的页面/error下的404.html、4xx.html................



步骤：

一但系统出现4XX或者5XX之类的错误；ErrorPageCustomizer就会生效（定制错误响应规则）；就会来到/error请求；就会被BasicErrorController处理；去哪个页面就会被DefaultErrorViewResolver解析处理

<img src="../../../../../../../../文件/MyBlog/source/_posts/New-SpringBoo/SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513015818937.png" alt="./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513015818937" style="zoom: 200%;" />



#### 八、定制错误信息

----

##### 1.异常处理

1. @ControllerAdvice：全局异常处理
   1. @ExceptionHandler ：注解用来指明异常的处理类型
   2. 这样只能返回JSON的数据，不能区分客户端和浏览器
   3. ![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513114726259](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513114726259.png)

##### **2.如何自适应浏览器和客户端**

* 使用转发return "forward:/error"；让SpringBoot处理

  * 因为SpringBoot处理/error请求时要获取状态码所以我们自己的错误处理器要加上，否则相应的是200

  * ```java
    request.setAttribute("javax.servlet.error.status_code",500);
    ```

  * 但是SpringBoot并没有我们定制的消息

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513122113665](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513122113665.png)



##### 3.如何携带自己编写的错误信息

###### 1.第一种方式

在ErrorMvcAutoConfiguration自定配置类中，当容器中没有ErrorController时才会添加SpringBoot默认错误处理，所以只需要写一个ErrorController的实现类，或者继承AbstractErrorController就会覆盖掉BasicErrorController，这样容器中只有我们自己写的ErrorController，这样无法使用SpringBoot提供的方法，不推荐这样做

```java
@Bean
//当容器中没有ErrorController时才会添加SpringBoot默认错误处理
@ConditionalOnMissingBean(value = ErrorController.class, search = SearchStrategy.CURRENT)
public BasicErrorController basicErrorController(ErrorAttributes errorAttributes,
      ObjectProvider<ErrorViewResolver> errorViewResolvers) {
   return new BasicErrorController(errorAttributes, this.serverProperties.getError(),
         errorViewResolvers.orderedStream().collect(Collectors.toList()));
}
```



###### 2.第二种方式

继承DefaultErrorAttributes并复写getErrorAttributes（获取错误属性）方法，这样既可以得到自己编写的错误信息，也可以得到SpringBoot为我们提供的Attributes。

**原理**

SpringBoot获取错误信息的方式

进入/error请求BasicErrorController就会处理请求，所以如果想要加入自己的错误信息，只要继承父类，然后覆写DefaultErrorAttributes即可

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513153249103](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513153249103.png)



#### 九、配置嵌入式Servlet容器

###### 1.修改Web容器配置

SpringBoot默认使用的是嵌入式Servlet容器（Tomcat）；

SpringBoot默认使用TomCat作为Servlet容器

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513162936766](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513162936766.png)

1. 如何定制和修改Servlet容器相关配置

   1. 修改和server相关的配置（ServerProperties）

   ```properties
   server.port=8080
   server.servlet.context-path=/zmy
   #Tomcat相关配置
   server.tomcat.xxxx=
   ```

   2. 编写一个WebServerFactoryCustomizer来修改容器的配置

   ```java
   @Bean
   public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer(){
       return new WebServerFactoryCustomizer<ConfigurableWebServerFactory>() {
           @Override
           public void customize(ConfigurableWebServerFactory factory) {
               factory.setPort(8083);
           }
       };
   }
   ```



###### 2.注册三大组件

```java
//Server的一些配置
@Configuration
public class MyServerConfig {
    //配置TomCat
    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer(){
        return new WebServerFactoryCustomizer<ConfigurableWebServerFactory>() {
            @Override
            public void customize(ConfigurableWebServerFactory factory) {
                factory.setPort(8083);
            }
        };
    }
    //添加一个Servlet
    @Bean
    public ServletRegistrationBean<HttpServlet> myServletServletRegistrationBean(){
        ServletRegistrationBean<HttpServlet> servletBean = new ServletRegistrationBean<HttpServlet>(new MyServlet());
        servletBean.addUrlMappings("/zzz");
        return servletBean;
    }
    //添加一个监听器
    @Bean
    public ServletListenerRegistrationBean myServletListenerRegistrationBean(){
        ServletListenerRegistrationBean<EventListener> bean = new ServletListenerRegistrationBean<>(new MyListener());
        return bean;
    }

}
```





SpringBoot帮我们配置了SpringMVC的时候，自动注册了SpringMVC的前端控制器

```java
@Bean(name = DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME)
@ConditionalOnBean(value = DispatcherServlet.class, name = DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)
public DispatcherServletRegistrationBean dispatcherServletRegistration(DispatcherServlet dispatcherServlet,
      WebMvcProperties webMvcProperties, ObjectProvider<MultipartConfigElement> multipartConfig) {
   DispatcherServletRegistrationBean registration = new DispatcherServletRegistrationBean(dispatcherServlet,
         webMvcProperties.getServlet().getPath());
   registration.setName(DEFAULT_DISPATCHER_SERVLET_BEAN_NAME);
   registration.setLoadOnStartup(webMvcProperties.getServlet().getLoadOnStartup());
   multipartConfig.ifAvailable(registration::setMultipartConfig);
   return registration;
}
```

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513224803286](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200513224803286.png)



#### 十、配置嵌入式Servlet容器==（先跳过）==

SpringBoot默认内置了TomCat

怎么使用其他Web容器呢

Jetty（适合长连接）

Undertow（高并发，不支持Jsp）

==先排除TmoCat再引入其他web容器==

SpringBoot嵌入式容器的配置





#### 十一、Docker

----

![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589398141261&di=57b7b99b50e19aa5d7060cc16f113079&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D46204048%2C697885358%26fm%3D214%26gp%3D0.jpg)

##### 1.简介

**Docker**是一个开源的应用容器引擎；是一个轻量级容器技术；

Docker支持将软件编译成一个镜像；然后在镜像中各种软件做好配置，将镜像发布出去，其他使用者可以直接使用这个镜像；

运行中的这个镜像称为容器，容器启动是非常快速的。



##### 2.核心概念

docker主机(Host)：安装了Docker程序的机器（Docker直接安装在操作系统之上）；

docker客户端(Client)：连接docker主机进行操作；

docker仓库(Registry)：用来保存各种打包好的软件镜像；

docker镜像(Images)：软件打包好的镜像；放在docker仓库中；

docker容器(Container)：镜像启动后的实例称为一个容器；容器是独立运行的一个或一组应用

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514004528149](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514004528149.png)

使用Docker的步骤：

1. 安装Docker
2. 去Docker仓库找到这个软件对应的镜像；
3. 使用Docker运行这个镜像，这个镜像就会生成一个Docker容器；
4. 对容器的启动停止就是对软件的启动停止；



##### 3.安装Docker

###### 1.安装linux虚拟机

1. VMWare、VirtualBox（安装）；
2. 导入虚拟机文件centos7-atguigu.ova；
3. 双击启动linux虚拟机;使用  root/ 123456登陆
4. 使用客户端连接linux服务器进行命令操作；
5. 设置虚拟机网络；
6. 桥接网络==选好网卡==接入网线；
7. 设置好网络以后使用命令重启虚拟机的网络

```shell
service network restart
```

8. 查看linux的ip地址

```shell
ip addr
```

9. 使用客户端连接linux；

###### 2.安装Docker

```sh
1、检查内核版本，必须是3.10及以上
uname -r
2、安装docker
yum install docker
3、输入y确认安装
4、启动docker
[root@localhost ~]# systemctl start docker
[root@localhost ~]# docker -v
Docker version 1.12.6, build 3e8e77d/1.12.6
5、开机启动docker
[root@localhost ~]# systemctl enable docker
6、停止docker
systemctl stop docker
```





##### 4.Docker命令

| 操作 | 命令                                                         | 说明                                                     |
| ---- | ------------------------------------------------------------ | -------------------------------------------------------- |
| 检索 | docker  search 关键字  eg：docker  search redis              | 我们经常去docker  hub上检索镜像的详细信息，如镜像的TAG。 |
| 拉取 | docker pull 镜像名:tag                                       | :tag是可选的，tag表示标签，多为软件的版本，默认是latest  |
| 列表 | docker images                                                | 查看所有本地镜像                                         |
| 删除 | docker rmi ./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-id | 删除指定的本地镜像                                       |

**查找镜像**

**docker search mysql**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514011933205](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514011933205.png)



##### 5.容器操作

| 操作     | 命令                                                         | 说明                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 运行     | docker run --name  自定义容器名称              -d   镜像名称 | --name：自定义容器名称    -d：后台运行                       |
| 容器列表 | docker ps                                                    | 查看运行的中的容器，加  -a  可以查看所有容器                 |
| 停止     | docker stop 容器名称/容器id                                  | 停止当前运行的容器                                           |
| 启动     | docker start 容器名称/容器id                                 | 启动容器                                                     |
| 删除     | docker rm 容器id                                             | 删除容器                                                     |
| 端口映射 | -p  映射端口:容器中的端口                                    | docker run -d -p 映射端口:容器中的端口 --name 自定义容器名称 镜像名称 |
| 容器日志 | docker loger 容器名称/容器id                                 |                                                              |

**为什么要进行端口映射？**

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514092444065](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514092444065.png)



在阿里拉取的镜像访问TomCat会出现404，解决方法

docker exec -it mytomcat /bin/bash   

将webapps.dist改为webapps

mv webapps.dist webapps



###### 1.将tomcat添加进容器

 docker run -d -p 8888:8080 --name mytomcat tomcat

###### 2.将MySql添加进容器

docker run -d -p 3306:3306 --name mysql01 -e MYSQL_ROOT_PASSWORD=183786 mysql

**高版本mysql会遇到问题**

docker exec -it 容器名

对远程连接进行授权：GRANT ALL ON *.* TO 'root'@'%';

更改密码的加密规则：ALTER USER 'root'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;

更改root的密码：ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; 

刷新权限：flush privileges;



#### 十二、SpringBoot&JDBC

---

```yml
spring:
  datasource:
    username: root
    password: '183786'
    url: jdbc:mysql://192.168.1.100:3306/jdbc?serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
```



效果：

​		默认使用的是com.zaxxer.hikari.HikariDataSource作为数据源

​		数据源所有的相关配置都在DataSourceProperties里面



自动配置原理：

参考DataSourceConfiguration，根据数配置创建数据源，默认使用Hikari数据源，也可以使用spring.datasource.type指定自定义的数据源类型

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514182419583](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514182419583.png)

SpringBoot默认支持的数据源：

![./SpringBoot/https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514182513545](https://cdn.jsdelivr.net/gh/Zmmmmy/Zmmmmy.github.io@master/posts/6f2612a2/image-20200514182513545.png)

也可以自定义数据源类型

```java
protected static <T> T createDataSource(DataSourceProperties properties, Class<? extends DataSource> type) {
    //使用DataSourceBuilder创建数据源，；利用反射创建相应的type数据源并绑定属性
   return (T) properties.initializeDataSourceBuilder().type(type).build();
}
```



##### 启动程序时加载建表sql

将sql文件命名为schema-*.sql、data-**sql就会自动的执行这些sql文件

```yml
#配置数据源
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.1.100:3306/jdbc?serverTimezone=GMT
    username: root
    password: '183786'
    #自定义文件
    schema:
    - classpath:zmy.sql
    initialization-mode: always
```



##### 整合druid数据源

引入druid依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.8</version>
</dependency>
```

使用type: com.alibaba.druid.pool.DruidDataSource切换数据源

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.1.100:3306/jdbc?serverTimezone=GMT
    username: root
    password: '183786'
    schema:
    - classpath:zmy.sql
    initialization-mode: always
    type: com.alibaba.druid.pool.DruidDataSource
```

###### 配置监控druid

```java
@Configuration
public class DruidConfig {
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource dataSource(){
        return new DruidDataSource();
    }

    @Bean
    public ServletRegistrationBean<StatViewServlet> bean(){
        ServletRegistrationBean bean = new ServletRegistrationBean<StatViewServlet>(new StatViewServlet(),"/druid/*");
        Map<String ,String> map = new HashMap<>();
        map.put("loginUsername","admin");
        map.put("loginPassword","123456");
        map.put("allow","");
        bean.setInitParameters(map);
        return bean;
    }
    @Bean
    public FilterRegistrationBean filterRegistrationBean(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new WebStatFilter());
        Map<String ,String> map = new HashMap<>();
        map.put("exclusions","*.js,*.css,/druid/*");
        bean.setInitParameters(map);
        bean.setUrlPatterns(Arrays.asList("/*"));
        return bean;
    }

}
```



##### 整合MyBatis

###### 1.配置数据源

使用druie数据源，配置如上

###### 2.创建数据表

###### 3.创建实体类

###### 4.创建mapper

**在查询方法加注解**：@Mapper

**或者在主配置类或启动类加**：@MapperScan(value = "com.zmy.mapper")



###### 自定义MyBatis配置规则

配置文件

```yml
#开启驼峰命名
mybatis:
  configuration:
    map-underscore-to-camel-case: false
#添加mapper映射和mybatis的配置文件
mybatis:
  configuration:
    map-underscore-to-camel-case: false
  config-location: 指定全局配置文件位置
  mapper-locations:   指定mapper映射位置
```

```java
//开启驼峰命名
@Configuration
public class MyBatisConfig {
@Bean
    public ConfigurationCustomizer configurationCustomizer(){
        return new ConfigurationCustomizer() {
            @Override
            public void customize(org.apache.ibatis.session.Configuration configuration) {
                configuration.setMapUnderscoreToCamelCase(true);
            }
        };
    }
}
```



##### 整合JPA

编写实体类

```java
@Entity  //这是一个实体类
@Table(name = "tbl_user") //对应表名
@JsonIgnoreProperties(value = {"hibernateLazyInitializer"}) //报500加这个
public class User {
    @Id //这是一个主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) //自增主键
    private Integer id;
    @Column(name = "last_name",length = 50) //和数据表对应的一个列
    private String lastNmae;
    @Column  //省略，列明就是属性名
    private String email;
    }
```

编写dao

```java
//继承JpaRepository
public interface UserRepository extends JpaRepository<User,Integer> {
}
```

配置文件

```yml
spring:
  datasource:
    url: jdbc:mysql://192.168.1.100:3306/jpa?serverTimeZone=GTM
    username: root
    password: '183786'
    driver-class-name: com.mysql.cj.jdbc.Driver
  #jpa配置
  jpa:
    hibernate:
      #更新或创建数据表结构
      ddl-auto: update
      #显示sql
    show-sql: true
```



#### 十三、SpringBoot启动流程==（先跳过）==

##### 1.创建SpringApplication对象







#### 十四、自定义Starter

----

如何编写自动配置类

```java
@Configuration //指定这个类是一个自动配置类
@ConditionalOnXXX //在指定条件下生效
@AutoConfigureAfter //指定自动配置类生效顺序
@Bean //给容器添加组件

@ConfigurationProperties(prefix = "spring.mvc") //结合WebMvcProperties类来绑定相关的配置
@EnableConfigurationProperties({ WebMvcProperties.class}) //让WebMvcProperties生效加入到容器中


自动配置类加载必须添加进MEAT-INF/spring.factories中
```



模式：

启动器只做依赖导入

专门编写一个自动配置模块

启动器依赖自动配置

自定义启动器名称



步骤：

创建一个空工程

编写一个zmy-spring-boot-starter模块，用来引入zmy-spring-boot-starter-autoconfigurer

编写一个配置类

```java
//设置配置文件前缀
@ConfigurationProperties(prefix = "zmy.hello")
public class HelloProperties {
    private String prefix;
    private String suffix;

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
}
```

编写一个可配置JavaBean

```java
public class HelloService {
    //引入配置程序
    HelloProperties helloProperties;

    public HelloProperties getHelloProperties() {
        return helloProperties;
    }

    public void setHelloProperties(HelloProperties helloProperties) {
        this.helloProperties = helloProperties;
    }

    public String hello(String name){
        return helloProperties.getPrefix()+"---"+name+"---"+helloProperties.getSuffix();
    }
}
```

编写一个自动配置程序

```java
//说明是一个配置类
@Configuration
//判断是不是web应用
@ConditionalOnWebApplication
//引入配置文件
@EnableConfigurationProperties(HelloProperties.class)
public class HelloServiceAutoConfiguration {
    @Autowired
    HelloProperties helloProperties;
    @Bean
    public HelloService helloService(){
        HelloService helloService = new HelloService();
        helloService.setHelloProperties(helloProperties);
        return helloService;
    }
}
```

创建META-INF/spring.factories，让SpringBoot识别

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.zmy.starter.HelloServiceAutoConfiguration
```

































