package com.wykop2.driver;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.io.File;

/**
 * Created by Marek on 2017-06-05.
 */
public class FirefoxTests extends WebDriverTests{

    public WebDriver getDriver() {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("geckodriver.exe").getFile());
        System.setProperty("webdriver.gecko.driver",file.getAbsolutePath());

        return new FirefoxDriver();
    }

}
