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

function SimpleButton(iX, iY, iLx, iLy)  {
  //constructor {
    // Constructor with pos & size
    this._iPosX= iX;
    this._iPosY= iY;
    this._iLenX= iLx;
    this._iLenY= iLy;

    this._bOver= false; 
    this._bClicked= false;
    this._bToggleButton= false;
    this._bOn= false;
    this._bEnabled= true;
    this._bShadow= true;
    this._colStroke= '35,41,49';
    this._fStrokeAlpha= 1.0;
    this._colStrokeOver= '238,238,238';
    this._colStrokeClicked= '238,238,238';
    this._colStrokeDisabled= '136,136,136';
    this._iStrokeW= 2;
    this._colFill= '154,175,203';
    this._fFillAlpha= 1.0;
    this._colFillOver= '154,175,203';
    this._colFillClicked= '238,238,238';
    this._colFillDisabled= '34,34,34';
    this._colText= '35,41,49';
    this._iRad= 7;
    this._sText= "";
    this._iTextSize= 12;
    this._colText= '17,17,17';
    this._colTextOver= '238,238,238';
    this._colTextClicked= '17,17,17';
    this._colTextDisabled= '136,136,136';
  

 

  // Default props
  this.resetDraw= function() {
    this._bOver= false; 
    this._bClicked= false;
    this._bToggleButton= false;
    this._bOn= false;
    this._bEnabled= true;
    this._bShadow= true;
    this._colStroke= '35,41,49';
    this._fStrokeAlpha= 1.0;
    this._colStrokeOver= '238,238,238';
    this._colStrokeClicked= '238,238,238';
    this._colStrokeDisabled= '136,136,136';
    this._iStrokeW= 2;
    this._colFill= '154,175,203';
    this._fFillAlpha= 1.0;
    this._colFillOver= '154,175,203';
    this._colFillClicked= '238,238,238';
    this._colFillDisabled= '34,34,34';
    this._colText= '35,41,49';
    this._iRad= 7;
    this._sText= "";
    this._iTextSize= 12;
    this._colText= '17,17,17';
    this._colTextOver= '238,238,238';
    this._colTextClicked= '17,17,17';
    this._colTextDisabled= '136,136,136';
  };

  // Drawing func.
  this.draw= function(app) {        
    // Design
    if (app != null) {
      app.rectMode(CENTER);
      // Shadow first
      if (this._bShadow) {
        iShadowW=10;
        app.noStroke();
        for (i=iShadowW; i>=0; i--) {
          app.fill(0, int(255.*(1.-float(i)/float(iShadowW))));
          app.rect(this._iPosX, this._iPosY+i, this._iLenX, this._iLenY, this._iRad);
        } 
      }
      
      // The button
      if (!this._bEnabled) {
        app.stroke('rgba('+ this._colStrokeDisabled+','+this._fStrokeAlpha.toString()+')');
        app.fill('rgba('+this._colFillDisabled+','+this._fFillAlpha.toString()+')');
      } else {
        if (this._bOver) {        
          app.stroke('rgba('+ this._colStrokeOver+','+this._fStrokeAlpha.toString()+')');
          app.fill('rgba('+ this._colFillOver+','+this._fFillAlpha.toString()+')');
          if (this._bClicked || (this._bToggleButton && this._bOn)) {
            app.stroke('rgba('+ this._colStrokeClicked+','+this._fStrokeAlpha.toString()+')');
            app.fill('rgba('+ this._colFillClicked+','+this._fFillAlpha.toString()+')');
          }
        } else {
          if (this._bToggleButton && this._bOn) {
            app.stroke('rgba('+ this._colStrokeClicked+','+this._fStrokeAlpha.toString()+')');
            app.fill('rgba('+ this._colFillClicked+','+this._fFillAlpha.toString()+')');
          } else {
            app.stroke('rgba('+this._colStroke+','+this._fStrokeAlpha.toString()+')');
            app.fill('rgba('+this._colFill+','+this._fFillAlpha.toString()+')');
          }
        }
      }
      
      app.rectMode(CENTER);      
      app.strokeWeight(this._iStrokeW);
      app.rect(this._iPosX, this._iPosY, this._iLenX, this._iLenY, this._iRad);

      // Text   
      if (!this._bEnabled) {
        app.fill('rgb('+this._colTextDisabled+')');
      } else {   
        if (this._bOver) {        
          app.fill('rgb('+this._colTextOver+')');
          if (this._bClicked || (this._bToggleButton && this._bOn)) {
            app.fill('rgb('+this._colTextClicked+')');
          }
        } else {
          if (this._bToggleButton && this._bOn) {
            app.fill('rgb('+this._colTextClicked+')');
          } else {
            app.fill('rgb('+this._colText+')');
          }
        }
      }
      app.textAlign(CENTER, CENTER);  
      app.textSize(this._iTextSize);
      app.text(this._sText, this._iPosX, this._iPosY);
    } // if (app != null)
  };

  // Change text inside
  this.setText= function(sText) {
    this._sText= sText;
  };

  // Change text size 
  this.setTextSize= function(iSize) {
    this._iTextSize= iSize;
  }

  // Is there any object over the button?
  this.over= function(iX, iY) {
    if (iX <= this._iPosX+this._iLenX/2 && iX >= this._iPosX-this._iLenX/2 && iY <= this._iPosY+this._iLenY/2 && iY >= this._iPosY-this._iLenY/2) {
      this._bOver=true;
    } else {
      this._bOver= false;
    }
    return this._bOver;
  }

  // Init the button as a toggle button
  this.setToggleButton= function(bToggle) {
    if (this._bEnabled) {
      this._bToggleButton= bToggle;
    }
  }

  // Toggle the button, for a toggle button only
  this.toggle= function() {
    if (this._bToggleButton && this._bEnabled) {
      this._bOn= !this._bOn;
    }
  }

  // Click it
  this.click= function(bClick) {
    if (this._bEnabled) {
      this._bClicked=bClick;
    }
  }  

  // For a toggle button, is it on?
  this.isOn= function() {
    return (this._bToggleButton && this._bOn);
  }
}
