/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict"

import "core-js/stable"
import "./../style/visual.less"
import powerbi from "powerbi-visuals-api"
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions
import IVisual = powerbi.extensibility.visual.IVisual
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions
import VisualObjectInstance = powerbi.VisualObjectInstance
import DataView = powerbi.DataView
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject

import { VisualSettings } from "./settings"

export class Visual implements IVisual {
  private target: HTMLElement
  private textData: any[]
  private sentimentData: any[]
  private settings: VisualSettings
  private textNode: Text
  private container: HTMLElement = document.createElement("div")

  constructor(options: VisualConstructorOptions) {
    console.log('VisualConstructorOptions')
    console.dir(options, { depth: 10 })
    this.target = options.element
  }

  public update(options: VisualUpdateOptions) {
    // remove all existings html nodes from target
    this.target.querySelectorAll('*').forEach(node => node.remove())

    // settings.ts file
    this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0])
    // const fontSize = this.settings.dataPoint.fontSizeValue.toString()
    const posColor = this.settings.dataPoint.positiveSentimentColor
    const negColor = this.settings.dataPoint.negativeSentimentColor
    const neuColor = this.settings.dataPoint.neutralSentimentColor
    // console.log('Settings')
    // console.dir(this.settings, { depth: 10 })

    console.log('Visual update')
    console.dir(options, { depth: 10 })

    // extract the values from the `Text Data` field
    const textValues = options.dataViews[0].categorical.categories[0].values
    this.textData = textValues

    // extract the values from the `Sentiment Data` field
    const sentimentValues = options.dataViews[0].categorical.values[0].values
    this.sentimentData = sentimentValues

    var paragraphElement: HTMLElement = document.createElement("p");

    // paragraphElement.style.fontSize = fontSize

    console.log('paragraphElement', paragraphElement)


    if (document && this.textData.length === this.sentimentData.length) {
      this.textData.forEach((token, i) => {

        const spanElement: HTMLElement = document.createElement("span")
        console.log('spanElement:', spanElement)
        const sentiment = this.sentimentData[i]

        this.textNode = document.createTextNode(`${token} `)
        spanElement.appendChild(this.textNode)

        switch (true) {
          case sentiment > 0:
            // spanElement.style.fontSize = fontSize
            spanElement.style.color = posColor
            break
          case sentiment < 0:
            // spanElement.style.fontSize = fontSize
            spanElement.style.color = negColor
            break
          default:
            // spanElement.style.fontSize = fontSize
            spanElement.style.color = neuColor
            break
        }
        paragraphElement.appendChild(spanElement)
      })

      console.log(paragraphElement)
      this.target.appendChild(paragraphElement)
    }
  }

  private static parseSettings(dataView: DataView): VisualSettings {
    return <VisualSettings>VisualSettings.parse(dataView)
  }

  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   *
   */
  public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options)
  }
}
