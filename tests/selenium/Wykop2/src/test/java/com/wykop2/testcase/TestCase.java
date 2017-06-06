package com.wykop2.testcase;

import org.openqa.selenium.WebDriver;

/**
 * Created by Marek on 2017-06-05.
 */
public class TestCase {
    static String homePage = "http://localhost:3000";
    static String delimeter = "/";
    static String signinPage = homePage + delimeter + "signin";
    static String signupPage = homePage + delimeter + "signup";

    //xpaths
    static String newPostButtonXpath = "//*[@id=\"content\"]/div/div/header/div/div/nav/a[2]";
    static String loginXpath = "//*[@id=\"content\"]/div/div/header/div/div/ul/li[1]/a";
    static String registerButtonXpath = "//*[@id=\"content\"]/div/div/div/div/div/div[2]/form/div[4]/button";
    static String h1CaptionXpath = "//*[@id=\"content\"]/div/div/div/div/div/div[1]/div/h1";

    WebDriver driver;
    public TestCase(WebDriver driver){
        this.driver = driver;
    }

    static void sleep(int milis){
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
