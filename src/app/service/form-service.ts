import { Injectable, Inject } from '@angular/core';
// import { CONFIG_TOKEN } from '@eui/core';
// import { SessionService } from './session.service';
// import { LogService } from '@eui/core';
// import { ReferenceDataDto } from '../models/dtos/reference-data.model';
import { FormGroup, FormArray, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ErrorMsgUtils } from '../form-errors/errors-utils';
// import { ReferenceDataUtilService } from './reference-data-util.service';
// import { PropertyData } from '../models/property-data.model';
// import { TranslateService } from '@ngx-translate/core';
import { ValidationUtils } from '../form-validation/validation-utils';

/**
 *  The purpose of this service is to host all the methods related to the form elements interactions
 * with the UI and for loading data in these form elements.
 *  PS: The return values of the methods have to be assigned always to a Form component.
 *
 */
export class FormElementsService {

    /**
     * Form Select Load data Functions
     */

    /**
     *  LOAD SELECT (Data)
     *  Description: Return a list of elements {id, value} to assign to a ux-form-control/select based on
     * a list of string.
     * @param inputData: string[] : List of strings to set as id and value.
     * @return list [{id,value}]
     */
    static getDataList(inputData: string[]) {
        const outputData: any[] = [];

        if (!inputData) {
            console.log('InputData is null! Check service response');
            return;
        }

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < inputData.length; i++) {
            outputData.push({
                id: inputData[i],
                value: inputData[i],
            });
        }

        return outputData;
    }

    /**
     * LOAD SELECT (Metadata,ReferenceData)
     *
     * Description: Return a list of elements {id, value, label:code} to assign to a ux-form-control/select based on a list of ids obtained
     * from a Metada service and the Reference data.
     * TODO: Review the need of return the code as a Label.
     *
     * @param listIds : List of the ids got from Metadata service.
     * @param referenceDataType  : Reference data used to load the Ids in the combo box
     * @return list [{id,description,code}]
     *
     * Example:
     * funds:
     *   listIds = [325,327] coming from MetaData Service
     *   ReferenceDataDto.FUND
     *   loadComboFromReferenceData(listIds,ReferenceDataDto.FUND)
     *   Return
     *   0: {id: 325,value: 'ERDF', label: 'code'}
     *   1: {id: 327,value: 'ESF+', label: 'code'}
     *
     * For further information about populate the <ux-form-control formControlName="selectValue" [isSelect]="true"> see:
     * https://eui.ecdevops.eu/eui-showcase-ux-7.x/app-style-guide/components/ux-form-control/select
     */

    static loadComboFromReferenceData(listIds: number[], referenceDataType: string, representation?: string) {

        /*
        const comboBox: PropertyData[] = [];

        this.refDataUtilService.populateDataWithReferenceDataFilteredByIds( referenceDataType,
            listIds, comboBox, representation);
            return comboBox;
        */
        return null;

    }

    /**
     * LOAD 2 LINKED SELECTS
     *
     *  Description: This method get a Map with the relation between 2 list.
     *  The goal is load the data in 2 select where The selection of one (Pivot Select) force to load
     * an specific list on the second one (targetSelect).
     *  The method will return an array with the list of ids to load on the pivot select and a Map with
     * the relation between the ids of the Pivot select and the list of elements to load in the target select.
     *
     * @param source : Map with { [name: string]: number[] }.
     * @param pivotRefData  : Reference data used to load the pivot Select.
     * @param targetRefData  : Reference data used to load the target Select.
     * @return '{pivotCombo, targetCombo}'
     *
     * Example:
     * Fund -> Region Category
     * Map = [{325,{2456,2478,2345}},{327,{2456,2478}}
     *
     * const combosRelated = this.loadRelatedCombos(result.fundRegionCategories,
     *                            ReferenceDataDto.FUND,
     *                            ReferenceDataDto.REGION_CAT);
     * TODO:
     * let targetCombo: Map<string, PropertyData[]>;
     * Type 'IterableIterator<[string, PropertyData[]]>' is not an array type or a string type. Use compiler option '--downlevelIteration'
     * to allow iterating of iterators.ts(2569)
     * https://stackoverflow.com/questions/49218765/typescript-and-iterator-type-iterableiteratort-is-not-an-array-type
     */

    static loadRelatedCombos(source: { [name: string]: number[] },
                      pivotRefData: string,
                      targetRefData: string,
                      representation?: string) {

        /*
        const pivotTargetMap = new Map<string, number[]>();
        const pivotComboIds: number[] = [];
        let targetComboIds: number[];

        let pivotCombo: PropertyData[];
        let targetCombo;

        let pivotComboRefData: ReferenceDataDto[];
        let targetComboRefData: ReferenceDataDto[];

        Object.keys(source).forEach(key => {
            pivotTargetMap.set(key, source[key]);
            pivotComboIds.push(parseInt(key, 10));
        });

        if (pivotComboIds != null) {
            pivotCombo = [];
            targetCombo = new Map<string, PropertyData[]>();

            pivotComboRefData = this.session.getReferenceDataAsArray(pivotRefData);
            targetComboRefData = this.session.getReferenceDataAsArray(targetRefData);

            for (const keyPivot of pivotComboRefData) {
                if (keyPivot) {

                    if (pivotComboIds && pivotComboIds.includes(keyPivot.messageId)) {

                        pivotCombo.push(this.refDataUtilService.getPorpertyDataFromReferenceData(keyPivot, representation));

                        targetComboIds = pivotTargetMap.get('' + keyPivot.messageId);

                        if (targetComboIds != null && targetComboIds.length !== 0) {
                            const selectOptionList: PropertyData[] = [];

                            for (const keyTarget of targetComboRefData) {

                                if (keyTarget) {

                                    if (targetComboIds && targetComboIds.includes(keyTarget.messageId)) {

                                        selectOptionList.push(
                                            this.refDataUtilService.getPorpertyDataFromReferenceData(keyTarget, representation));

                                    }

                                }

                            }

                            targetCombo.set('' + keyPivot.messageId, selectOptionList);

                        }

                    }
                }
            }

        }

        return { 'pivotCombo' : pivotCombo, 'targetCombo': targetCombo };
        */

    }

    /**
     * LOAD 3 LINKED SELECT:
     *
     *  Description: This method get a Map with the relation between 3 list.
     *  The goal is load the data in 3 selects where The selection of one (Pivot Select) force to load
     * an specific list on the second one (targetSelect) and teh second one on a third one.
     *  The method will return an array with the list of ids to load on the pivot select and 2 Maps with
     * the relation between the Pivots select and the targets select.
     *
     * @param source1:        {[name: string]: { [name: string]: number[] }
     * @param pivotRefData:   Reference data used to load the pivot Select.
     * @param targetRefData:  Reference data used to load the target Select.
     * @return 'firstCombo':  firstCombo, 'secondMapCombo': secondMapCombo, 'thirdMapCombo': thirdMapCombo'
     *
     * Example:
     * Map = [{325,{2456,2478,2345}},{327,{2456,2478}}
     *
     * const combosRelated = this.loadRelatedCombos(result.fundRegionCategories,
     *                            ReferenceDataDto.FUND,
     *                            ReferenceDataDto.REGION_CAT);
     *
     */

    static load3RelatedList(
        source1: {[name: string]: { [name: string]: number[] }},
        pivotRefData: string,
        targetRefData: string, representation?: string) {

        /*
        const firstPivotTargetMap = new Map<string, { [name: string]: number[] }>();
        let source2: { [name: string]: number[] };

        const pivotComboIds: string[] = [];

        let firstCombo, secondMapCombo, thirdMapCombo;

        Object.keys(source1).forEach(key => {
            firstPivotTargetMap.set(key, source1[key]);
            pivotComboIds.push(key);
        });

        // console.log('firstPivotTargetMap', firstPivotTargetMap);
        // console.log('pivotComboIds', pivotComboIds);

        if (pivotComboIds != null) {
            firstCombo = [];
            secondMapCombo = new Map<string, PropertyData[]>();
            thirdMapCombo = new Map<string, PropertyData[]>();

            for (let i = 0; i < pivotComboIds.length; i++) {

                // console.log('pivotComboIds[i]' + i, pivotComboIds[i]);
                firstCombo.push({ id: '' + pivotComboIds[i], value: '' + pivotComboIds[i], code: '' + pivotComboIds[i] });

                source2 = firstPivotTargetMap.get('' + pivotComboIds[i]);

                if (source2) {

                    const combosRelated = this.loadRelatedCombos(source2,
                        pivotRefData,
                        targetRefData, representation);

                    // console.log('combosRelated.pivotCombo', combosRelated.pivotCombo);
                    // console.log('combosRelated.targetCombo', combosRelated.targetCombo);

                    if (combosRelated.pivotCombo) {
                        secondMapCombo.set('' + pivotComboIds[i], combosRelated.pivotCombo);

                        if (combosRelated.targetCombo) {
                            for (const [key, value] of combosRelated.targetCombo.entries()) {
                                thirdMapCombo.set(pivotComboIds[i] + '-' + key, value);
                            }

                        }
                    }

                }

            }

        }

        return { 'firstCombo' : firstCombo, 'secondMapCombo': secondMapCombo, 'thirdMapCombo': thirdMapCombo };
        */
        return null;

    }

    /* In case, the select does not have values it will not be displayed.
     * In case, the select has just one value the combo will be disabled.
     * In case, the select has more than one value the combo will be Enable.
     */

    /**
     * Form simple Select display.
     */
    static loadSelect(form: FormGroup, formElementId: string, select: any[], mandatory: boolean) {
        let disableSelect = true;
        let hideSelect = true;

        if (select) {
            disableSelect = this.disableSelect(form, select, formElementId);
            hideSelect = this.hideSelect(select);
        }

        this.updateSelectValidators(mandatory, hideSelect, form, formElementId);

        return { selectElements : select, disabled: disableSelect, hidden : hideSelect };

    }

    static loadTargetSelect(form: FormGroup, formElementId: string, selectedId: string, sourceMap: Map<string, any[]>, mandatory: boolean) {
        let selectElementsList = [];
        let disableSelect = true;
        let hideSelect = true;

        if (selectedId != null && sourceMap != null) {

            if (!(typeof sourceMap.get('' + selectedId) === 'undefined')) {
                selectElementsList = sourceMap.get('' + selectedId);
            }

            disableSelect = this.disableSelect(form, selectElementsList, formElementId);
            hideSelect = this.hideSelect(selectElementsList);

        }

        this.updateSelectValidators(mandatory, hideSelect, form, formElementId);

        return { selectElements: selectElementsList, disabled: disableSelect, hidden: hideSelect };
    }

    static hideSelect(select: any) {
        let hideCombo = false;
        if (!(typeof select === 'undefined')) {
            hideCombo = select.length === 0;
        }
        return hideCombo;
    }

    static disableSelect(form: FormGroup, select: any, elementId: string ) {
        let disableSelect = false;
        if (!(typeof select === 'undefined')) {
            if (select.length === 1) {
                form.controls[elementId].setValue(select[0].id);
                disableSelect = true;
            }
        }
        return disableSelect;
    }

    /**
     * FORM VALIDATION MESSAGES (TODO Create an specific service for validations ???)
     */

    static  updateSelectValidators(mandatory: boolean, hideSelect: boolean, form: FormGroup, formElementId: string) {
        /**
         * TODO: Create a generic one for all form Elements.
         * By default select can have just one validator mandatory or not.
         */

        if (mandatory) {
            if (hideSelect) {
                form.controls[formElementId].setValidators(null);
            } else {
                form.controls[formElementId].setValidators(Validators.required);
            }
        }
    }

    // tslint:disable-next-line: ban-types
    static traverseForm(group: FormGroup | FormArray, visitor: Function) {

        console.log('traverseForm');

        Object.keys(group.controls).forEach((key: string) => {
            console.log(key);
            const abstractControl = group.controls[key];

            if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
                FormElementsService.traverseForm(abstractControl, visitor);
            } else {
                // !abstractControl.valid && abstractControl.dirty && abstractControl.touched
                if (!abstractControl.valid && abstractControl.dirty) {
                    visitor(key, abstractControl);
                }
            }

        });

    }

}
