package com.wykop2.testcase;

import org.openqa.selenium.WebDriver;

/**
 * Created by Marek on 2017-06-05.
 */
public class TestCase {
    static String homePage = "http://localhost:3000";
    static String delimeter = "/";
    static String signinPage = homePage + delimeter + "signin";

    //xpaths
    static String newPostXpath = "//*[@id=\\\"content\\\"]/div/div/header/div/div/nav/a[3]";
    static String loginXpath = "//*[@id=\"content\"]/div/div/header/div/div/ul/li[1]/a";

    WebDriver driver;
    public TestCase(WebDriver driver){
        this.driver = driver;
    }
}
