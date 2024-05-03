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
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IVisualHost = powerbi.extensibility.visual.IVisualHost
import { IBasicFilter, FilterType } from "powerbi-models";

import { VisualSettings } from "./settings";
import { transformData, VData } from "./transformdata" 
export class Visual implements IVisual {
    private target: HTMLElement;
    private host: IVisualHost;
    private settings: VisualSettings;
    private container: HTMLElement;
    private slicerItems: HTMLElement;
    private select: HTMLElement;
    private selectSpan: HTMLElement;
    private caret: HTMLElement;
    private menu: HTMLElement;
    // private items: NodeListOf<HTMLElement>;
    // private formattingSettings: VisualFormattingSettingsModel;
    // private formattingSettingsService: FormattingSettingsService;
    private basicFilter: IBasicFilter;
    private data: VData;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.host = options.host
        this.basicFilter = null
        this.data = null;
        if (document) {
            this.container = document.createElement('div')
            this.container.classList.add('dropdown')
            this.select = document.createElement('div')
            this.select.classList.add('select')
            this.selectSpan = document.createElement('span')
            this.selectSpan.classList.add('selected')
            this.caret = document.createElement('div')
            this.caret.classList.add('caret')
            this.menu = document.createElement('ul')
            this.menu.classList.add('menu')
            this.container.appendChild(this.select)
            this.select.appendChild(this.selectSpan)
            this.select.appendChild(this.caret)
            this.container.appendChild(this.menu)
            this.target.appendChild(this.container)
        }
    }



    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        console.log('Visual update', options);
        this.data = transformData(options);
        console.log(this.data)

        this.basicFilter = {
            $schema:  "https://powerbi.com/product/schema#basic",
            target: {
                table: this.data.table,
                column: this.data.column
            },
            operator: "In",
            values: null,
            filterType: FilterType.Basic
        }

        // this.select.addEventListener('click', ()=>{
        //     this.select.classList.toggle('select-clicked')
        //     this.caret.classList.toggle('caret-rotate')
        //     this.menu.classList.toggle('menu-open')
        // })

        this.select.onclick = ()=> {
            this.select.classList.toggle('select-clicked')
            this.caret.classList.toggle('caret-rotate')
            this.menu.classList.toggle('menu-open')
        }


        // slicer items
        while(this.menu.firstChild){
            this.menu.firstChild.remove()
        }

        this.addItem('All')

        for (let value of this.data.values) {
            this.addItem(<string>value)
        }

        // const items = document.querySelectorAll('.menu li') as NodeListOf<HTMLElement>


        // items.forEach(slicerItem => {
        //     console.log(slicerItem)
        //     slicerItem.onclick = ()=>{
        //         items.forEach(item => {
        //             item.classList.remove('active')
        //         })
        //         slicerItem.classList.add('active')
        //     }
        //     });
        


        

        // items.forEach(item=>{
        //     item.addEventListener('click',()=>{
        //         console.log(item)
        //         this.selectSpan.innerText = item.innerText;
        //         this.selectSpan.classList.add('text-fade-in');
        //         setTimeout(()=>{
        //             this.selectSpan.classList.remove('text-fade-in');
        //         }, 300);
        //         this.select.classList.remove('select-clicked')
        //         this.caret.classList.remove('caret-rotate')
        //         this.menu.classList.remove('menu-open')
        //         // items.forEach(item => {
        //         //     item.classList.remove('active')
        //         // });
        //         // item.classList.add('active')
        //     })
        // })

    }
    

    private addItem(txt:string): void {
        
        let slicerItem = document.createElement('li')
        
        slicerItem.innerText = txt
        slicerItem.onclick = () => {
            console.log(slicerItem)
            this.selectSpan.innerText = txt;
            this.selectSpan.classList.add('text-fade-in');
            setTimeout(()=>{
                this.selectSpan.classList.remove('text-fade-in');
            }, 300);
            this.select.classList.remove('select-clicked')
            this.caret.classList.remove('caret-rotate')
            this.menu.classList.remove('menu-open')
            // slicerItem.classList.add('active')

            this.basicFilter.values = [txt]
            this.host.applyJsonFilter(this.basicFilter,'general', 'filter', powerbi.FilterAction.merge)
        }
        this.menu.appendChild(slicerItem)
        // const items = document.querySelectorAll('.menu li') as NodeListOf<HTMLElement>

        // items.forEach(slicerItem1 =>{
        //     slicerItem1.onclick = () => {
        //         console.log(slicerItem1)
        //         this.selectSpan.innerText = slicerItem1.innerText;
        //         this.selectSpan.classList.add('text-fade-in');
        //         setTimeout(()=>{
        //             this.selectSpan.classList.remove('text-fade-in');
        //         }, 300);
        //         this.select.classList.remove('select-clicked')
        //         this.caret.classList.remove('caret-rotate')
        //         this.menu.classList.remove('menu-open')


        //         // items.forEach(item => {
        //         //         item.classList.remove('active')
        //         //     })
        //         slicerItem1.classList.add('active')
    
                
        //         this.basicFilter.values = [slicerItem1.innerText]
        //         this.host.applyJsonFilter(this.basicFilter,'general', 'filter', powerbi.FilterAction.merge)
        //     }
        // })
        
    }


    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}