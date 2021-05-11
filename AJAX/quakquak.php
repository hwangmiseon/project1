<?php
    /* php 디버깅시 필요, php 에러가 발생하면 브라우져에 보여집니다. default 설정값은 안보임입니다
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    header('Content-type:text/json');
    */
    // $fileContents= file_get_contents("https://news.google.com/rss/search?q=".urlencode($_GET["search"])."&hl=ko&gl=KR&ceid=KR:ko");
     $fileContents= file_get_contents("https://news.google.com/rss/search?q=".urlencode($_GET["cat"])."&hl=ko&gl=KR&ceid=KR:ko");
    $simpleXml = simplexml_load_string($fileContents);  // xml 읽는 함수
    $json = json_encode($simpleXml);                    // xml -> json 으로 변환해주는 함수
    echo $json;

    // echo file_get_contents("https://news.google.com/rss/search?q=송지효&hl=ko&gl=KR&ceid=KR:ko");
?>
