> https://www.geeksforgeeks.org/jar-files-java/

- jar(java archive)는 파일 포맷이다.
  - 이것은 일반적으로 많은 자바 클래스 파일을 모아주고, 여타 다른 메타 파일과 리소스들을 하나의 파일로 연결시켜준다.
  - 그렇게 함으로써 자바 플랫폼에 있는 여러 다른 어플리에키션 소프트웨어나 라이브러리에 제공할 수 있게 한다.
- 단순하게 말하면, jar 파일은 단순히 그냥 파일이다.
  - 그런데 어떤 파일이냐면 (.class, audio, image 그리고 폴더들) 파일이 압축된 파일이다.
  - 우리는 .jar 파일을 zipped file처럼 여겨도 된다.
- 이제 어떻게 .jar 파일을 만드는지 그리고 연관된 명령어들은 무엇이 있는지 알아보자.

## 1.1 Create a JAR file

- .jar 파일을 만들기 위해서는 jar cf command 를 이용할 것이다.

```bash
jar cf [jarfile] [input files]
```

## 1.2 View a JAR file

- 이제 위의 명령어를 통해서 jar 파일이 만들어질 것이다. 이제 이 jar 파일을 보이 위해서는 우리는 다음의 명령어를 사용할 것이다.

```bash
jar tf [jarfile]
```

- 여기서 tf는 table of contents의 약자이다. 예를 들어서, pack.jar 파일의 내용을 보기 위해서는 다음의 명령어를 사용할 것이다.

```bash
jar tf pack.jar
```

그러면 다음과 같은 결과를 얻을 수 있을 것이다.

```bash
META-INF/
META-INF/MANIFEST.MF
pack/
pack/class1.class
pack/class2.class
```

여기 class1, class2는 패키지 팩 안에 있는 클래스들이다. 처음에 있는 두 가지 것들은 pack.jar 에 들어간 manifest file이다. 세 번째는 서브 디렉토리이다. 그리고 그 다음에있는 class1.class와 class2.class는 는 그 디렉토리 안쪽에 있는 파일들을 나타내는 것이다.

```
META-INF/MANIFEST.MF
```

// This manifest file is useful to specify the information about other files which are packaged.

이 파일은 패키지 안에 있는 다른 파일들에 대한 정보를 제공해준다.

## 1.3 Extract a JAR file

- .jar 파일에서부터 파일들을 뽑아내기 위해서, 우리는 아래의 명령어를 이용할 수 있다.

```
jar xf [jarfilename]
```

여기서 xf는 extract from jar file의 약자이다. 예를 들어서, pack.jar 파일에서 모든 파일들을 추출하기 위해서는 다음의 명령어를 사용할 것이다.

```bash
jar xf pack.jar
```

이것은 다음의 결과를 얻을 것이다.

```bash
META-INF
```

이 디렉토리에서 우리는 class1.class와 class2.class를 볼 수 있다.

## 1.4 Updating a JAR file

- jar tool은 u 옵션을 제공해준다. 이것을 통해서 당신은 이미 존재하는 jar 파일에 새로운 파일들을 추가할 수 있다.

```bash
jar uf [jarfile] [input files]
```

여기서 uf는 update jar file의 약자이다. 예를 들어서, pack.jar 파일에 새로운 파일들을 추가하기 위해서는 다음의 명령어를 사용할 것이다.

```bash
jar uf pack.jar class3.class
```

## 1.5 Running a JAR file

이 JAR 파일을 실행하기 위해서 우리는 다음과 같은 명령어를 사용할 것이다.

```bash
java -jar [jarfile]
```
