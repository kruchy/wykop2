package com.wykop2.driver;

import com.wykop2.testcase.AuthTests;
import com.wykop2.testcase.PostingTests;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 * Created by Marek on 2017-06-05.
 */
public abstract class WebDriverTests {

    WebDriver driver;
    boolean omitContent = false;
    public abstract WebDriver getDriver();

    @Before
    public void setDriver(){
        driver = getDriver();
    }

    @After
    public void quitDriver(){
        driver.quit();
    }

//    @Test
//    public void testNavigation(){
//        NavigationTests tests = new NavigationTests(driver);
//        tests.testAccesHomePage();
//        tests.testGoToRegisterPage();
//        tests.testGoToLoginPage();
//    }

//    @Test
//    public void testAuth(){
//        AuthTests tests = new AuthTests(driver);
//        tests.testRegister();
//        tests.testLogin();
//        tests.testLogout();
//    }

    @Test
    public void testPosting(){
        PostingTests tests = new PostingTests(driver);
        tests.testAddPost(omitContent);
    }

}
