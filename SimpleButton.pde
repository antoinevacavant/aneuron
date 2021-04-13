/*****************************************************************************
Copyright (c) 2021 Antoine Vacavant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*****************************************************************************/

/*****************************************************************************
SimpleButton
------------
Class to add and interact with buttons
Not perfect, but works well ;)
*****************************************************************************/

public class SimpleButton {

  // Position and size
  protected int _iPosX;
  protected int _iPosY;
  protected int _iLenX;
  protected int _iLenY;

  // Is there any object on the button?
  protected boolean _bOver; 

  // Is the mouse clicking?
  private boolean _bClicked;

  // Is it a toggle button?
  private boolean _bToggleButton;
  private boolean _bOn;

  // Is this enabled?
  private boolean _bEnabled;

  // Colors and graphical props 
  protected color _colStroke;
  protected int _iStrokeAlpha;
  protected color _colStrokeOver;
  protected color _colStrokeClicked;
  protected color _colStrokeDisabled;
  protected int _iStrokeW;
  protected color _colFill;
  protected int _iFillAlpha;
  protected color _colFillOver;
  protected color _colFillClicked;
  protected color _colFillDisabled;
  protected int _iRad;

  // Is there a shadow?
  protected boolean _bShadow;

  // Text inside
  private String _sText;
  private int _iTextSize;
  private color _colText;
  private color _colTextOver;
  private color _colTextClicked;
  private color _colTextDisabled;

  // When moving the button, can shift w.r.t. mouse pos
  protected int _iShiftX;
  protected int _iShiftY;

  // Constructor with pos & size
  public SimpleButton(int iX, int iY, int iLx, int iLy) {
    _iPosX= iX;
    _iPosY= iY;
    _iLenX= iLx;
    _iLenY= iLy;
    resetDraw();
  }

  // Default constructor
  public SimpleButton() {
    resetPos(); 
    resetDraw();
  }

  // Position at top left
  public void resetPos() {
    _iPosX=25;
    _iPosY=15;
    _iLenX=50;
    _iLenY=30;
  }

  // Get left, right, top, bottom borders 
  public int getLeft() {
    return _iPosX-_iLenX/2;
  }
  public int getRight() {
    return _iPosX+_iLenX/2;
  }
  public int getTop() {
    return _iPosY-_iLenY/2;
  }
  public int getBottom() {
    return _iPosY+_iLenY/2;
  }

  public int getLenX() {
    return _iLenX;
  }
  public int getLenY() {
    return _iLenY;
  }
  public int getPosX() {
    return _iPosX;
  }
  public int getPosY() {
    return _iPosY;
  }

  // Default props
  public void resetDraw() {
    _bOver= false;
    _bClicked= false;
    _bToggleButton= false;
    _bOn= false;
    _bEnabled= true;
    _bShadow= true;
    _colStroke= #232931;
    _iStrokeAlpha= 255;
    _colStrokeOver= #EEEEEE;
    _colStrokeClicked= #EEEEEE;
    _colStrokeDisabled= #888888;
    _iStrokeW= 2;
    _colFill= #9AAFCB;
    _iFillAlpha= 255;
    _colFillOver= #9AAFCB;
    _colFillClicked= #EEEEEE;
    _colFillDisabled= #222222;
    _colText= #232931;
    _iRad= 7;
    _sText= "";
    _iTextSize= 12;
    _colText= #111111;
    _colTextOver= #EEEEEE;
    _colTextClicked= #111111;
    _colTextDisabled= #888888;
  }

  // Drawing func.
  public void draw(PApplet app) {        
    // Design
    if (app != null) {
      app.rectMode(CENTER);
      // Shadow first
      if (_bShadow) {
        int iShadowW=10;
        noStroke();
        for (int i=iShadowW; i>=0; i--) {
          app.fill(0,int(255.*(1.-float(i)/float(iShadowW))));
          app.rect(_iPosX, _iPosY+i, _iLenX, _iLenY, _iRad);
        } 
      }
      
      // The button
      if (!_bEnabled) {
        app.stroke(_colStrokeDisabled, _iStrokeAlpha);
        app.fill(_colFillDisabled, _iFillAlpha);
      } else {
        if (_bOver) {        
          app.stroke(_colStrokeOver, _iStrokeAlpha);
          app.fill(_colFillOver, _iFillAlpha);
          if (_bClicked || (_bToggleButton && _bOn)) {
            app.stroke(_colStrokeClicked, _iStrokeAlpha);
            app.fill(_colFillClicked, _iFillAlpha);
          }
        } else {
          if (_bToggleButton && _bOn) {
            app.stroke(_colStrokeClicked, _iStrokeAlpha);
            app.fill(_colFillClicked, _iFillAlpha);
          } else {
            app.stroke(_colStroke, _iStrokeAlpha);
            app.fill(_colFill, _iFillAlpha);
          }
        }
      }
      app.rectMode(CENTER);      
      app.strokeWeight(_iStrokeW);
      app.rect(_iPosX, _iPosY, _iLenX, _iLenY, _iRad);

      // Text   
      if (!_bEnabled) {
        app.fill(_colTextDisabled);
      } else {   
        if (_bOver) {        
          app.fill(_colTextOver);
          if (_bClicked || (_bToggleButton && _bOn)) {
            app.fill(_colTextClicked);
          }
        } else {
          if (_bToggleButton && _bOn) {
            app.fill(_colTextClicked);
          } else {
            app.fill(_colText);
          }
        }
      }
      app.textAlign(CENTER, CENTER);  
      app.textSize(_iTextSize);
      app.text(_sText, _iPosX, _iPosY);
    } // if (app != null)
  }

  // Move the button
  public void move(int iX, int iY) {
    _iPosX= iX+_iShiftX;
    _iPosY= iY+_iShiftY;
  }

  // Resize
  public void resize(int iLx, int iLy) {
    _iLenX= iLx;
    _iLenY= iLy;
  }

  // Change text inside
  public void setText(String sText) {
    _sText= sText;
  }

  // Change text size 
  public void setTextSize(int iSize) {
    _iTextSize= iSize;
  }

  // Is there any object over the button?
  public boolean over(int iX, int iY) {
    if (iX <= _iPosX+_iLenX/2 && iX >= _iPosX-_iLenX/2 && iY <= _iPosY+_iLenY/2 && iY >= _iPosY-_iLenY/2) {
      _bOver=true;
    } else {
      _bOver= false;
    }
    return _bOver;
  }

  // Click it
  public void click(boolean bClick) {
    if (_bEnabled) {
      _bClicked=bClick;
    }
  }

  // Init the button as a toggle button
  public void setToggleButton(boolean bToggle) {
    if (_bEnabled) {
      _bToggleButton= bToggle;
    }
  }

  // Toggle the button, for a toggle button only
  public void toggle() {
    if (_bToggleButton && _bEnabled) {
      _bOn= !_bOn;
    }
  }

  // For a toggle button, is it on?
  public boolean isOn() {
    return (_bToggleButton && _bOn);
  }

  // Is it clicked?
  public boolean isClicked() {
    return _bClicked;
  }

  // Enable/Disable
  public void enable(boolean bEnable) {
    _bEnabled= bEnable;
  }
  
  // Shift pos w.r.t. mouse for instance
  public void shift(int iX, int iY) {
    _iShiftX=_iPosX-iX;
    _iShiftY=_iPosY-iY; 
  }
}
