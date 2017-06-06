package com.wykop2.driver;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.File;

/**
 * Created by Marek on 2017-06-05.
 */
public class ChromeTests extends WebDriverTests {

    public WebDriver getDriver() {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("chromedriver.exe").getFile());
        System.setProperty("webdriver.chrome.driver",file.getAbsolutePath());
        omitContent = true;
        return new ChromeDriver();
    }

}
