package com.wykop2;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Marek on 2017-06-04.
 */
public class TestSelenium {

    public static void main(String[] args) throws MalformedURLException {
//        String URL = "http://localhost:3000/";
//        DesiredCapabilities caps = DesiredCapabilities.chrome();
//        caps.setCapability("platform", "Windows 7");
//        //caps.setCapability("version", "43.0");
//
//        WebDriver driver = new RemoteWebDriver(new URL(URL), caps);
//
//        driver.get("http://localhost:3000/");
//        System.out.println("Title: "+driver.getTitle());
//        driver.quit();
        //chromeDriver.quit();
        //WebElement webElement = chromeDriver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li[2]/a"));

        WebDriver driver = new FirefoxDriver();

        //Launch the Online Store Website
        driver.get("http://www.google.com");

        // Print a Log In message to the screen
        System.out.println("Successfully opened the website ");

        //Wait for 5 Sec
//        try {
//            Thread.sleep(5000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        // Close the driver
        driver.quit();
    }
}
