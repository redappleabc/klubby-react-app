import React, { useContext } from "react";
import { Label, Input } from "reactstrap";
import ThemeContext from "../Contexts/ThemeContext";
import "../assets/scss/custom/components/_themesetter.scss";
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

if (Capacitor.isNativePlatform()) {
  if (Capacitor.getPlatform() === "ios") {
    if (localStorage.getItem("globalTheme") == "dark") {
      StatusBar.setStyle({ style: Style.Dark })
    } else {
      StatusBar.setStyle({ style: Style.Light })
    }
  }
  Keyboard.setScroll({ isDisabled: true });
  StatusBar.setOverlaysWebView({ overlay: false });
}
export default function ThemeSetter() {
  const { setTheme } = useContext(ThemeContext);
  const { setColor } = useContext(ThemeContext);




  return (
    <div>
      <div className="mt-2 mb-2">
        <p>Theme</p>
      </div>
      <div>
        <Label check>
          <Input type="radio" name="radio1" value="dark" onChange={() => {
            setTheme("dark")
            if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "ios") {
              StatusBar.setStyle({ style: Style.Dark })
            }
          }} />  Dark mode
        </Label>
        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
        <Label check>
          <Input type="radio" name="radio1" value="light" onChange={() => {
            setTheme("light")
            if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "ios") {
              StatusBar.setStyle({ style: Style.Light })
            }
          }} /> Light mode
        </Label>
      </div>
      <div className="mt-4 mb-2">
        <p>Color</p>
      </div>
      <div className="custom-radios">
        <div>
          <Input type="radio" id="color-0" name="color" value="color-1" onChange={() => setColor("color_0")} />
          <label htmlFor="color-0">
            <span>
              <i className="ri-check-line"></i>
            </span>
          </label>
        </div>

        <div>
          <Input type="radio" id="color-1" name="color" value="color-1" onChange={() => setColor("color_1")} />
          <label htmlFor="color-1">
            <span>
              <i className="ri-check-line"></i>
            </span>
          </label>
        </div>

        <div>
          <Input type="radio" id="color-2" name="color" value="color-2" onChange={() => setColor("color_2")} />
          <label htmlFor="color-2">
            <span>
              <i className="ri-check-line"></i>
            </span>
          </label>
        </div>

        <div>
          <Input type="radio" id="color-3" name="color" value="color-3" onChange={() => setColor("color_3")} />
          <label htmlFor="color-3">
            <span>
              <i className="ri-check-line"></i>
            </span>
          </label>
        </div>

        <div>
          <Input type="radio" id="color-4" name="color" value="color-4" onChange={() => setColor("color_4")} />
          <label htmlFor="color-4">
            <span>
              <i className="ri-check-line"></i>
            </span>
          </label>
        </div>
      </div>
    </div>

  );
}

