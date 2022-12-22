// @flow
import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
// import classNames from 'classnames';
//$FlowFixMe[cannot-resolve-module]
import {Toast} from 'primereact/toast';
//$FlowFixMe[cannot-resolve-module]
import {DataTable} from 'primereact/datatable';
//$FlowFixMe[cannot-resolve-module]
import {Column} from 'primereact/column';

import type {ApiProps} from '../../service/Api';
import type {CommandType, TblColRender} from '../types';
// import {AuthUtils} from '../../service/AuthUtils';
import {UIUtils} from '../../service/Utils';
import {AdminApi} from '../../service/AdminApi';

type Props = {
  selectionMode?: string,
  selection?: any,
  header?: string,
  reload?: boolean,
  command?: CommandType,
  onSelect?: (evt: any) => void,
};

export function FishPondList(props: Props): React$Node {
  const conf = useSelector((state) => state.settings);
  const auth = useSelector((state) => state.auth);  
 
  const toastRef = useRef();
  const apiRef = useRef<?AdminApi>();
   console.log(auth);
   
  useEffect(() => {
    // console.log('Effect // setup api');
    let apiProps: ApiProps = {
      ...conf,
      token: auth.token,
    };
    let api = new AdminApi(apiProps);
    apiRef.current = api;

    console.log(apiProps);
    // console.log('setup api done', api);
  }, [conf, auth]);

  useEffect(() => {
    // console.log('init selection', selection);
    if (selection) {
      if (selMode === 'single') {
        setSelFishPond({...selection});
      } else {
        setSelFishPonds([...selection]);
      }
    } else {
      if (selMode === 'single') {
        setSelFishPond(null);
      } else {
        setSelFishPonds([]);
      }
    }
  }, [selection, selMode]);



  useEffect(() => {
    // console.log('Effect // fetch batches');
    // console.log('machLinesTblStart', machLinesTblStart);
    let api: ?AdminApi = apiRef.current;
    if (!api) {
      return;
    }
    let start = fishPondsTblStart;
    let limit = fishPondsTblLimit;
    let joins = [
    ];

    // let sorts = ['-obj.invDate', '-obj.createdAt'];
    let sorts = sortMeta.map((sm) => {
      return sm.order > 0 ? sm.field : `-${sm.field}`;
    });
    console.log('sorts', search);
    // let sortFds = sortMeta.map((sm) => sm.field);

    api
      .getFishPonds({search, joins, start, limit})
      .then((resp) => resp.data)
      .then((resp) => {
        let {errors, data} = resp;
        if (errors.length > 0) {
          console.log('getmachLines // return errors', errors);
          UIUtils.showError({errors, toast: toastRef.current});
          return;
        }
         console.log('got invoice resp data', data);
         setFishPondsTblData([...data.list]);
         setFishPondsTblNbRows(data.count);
      })
      .catch((err) => {
        console.log('getmachLines // network error', err);
        UIUtils.showError({error: err, toast: toastRef.current});
      });
  }, [search, fishPondsTblStart, fishPondsTblLimit, reload, sortMeta]);

  
 const _onFishPondSelected = (evt: any) => {
    if (selMode === 'single') {
      setSelFishPond(evt.value);
    } else {
      setSelFishPonds(evt.value);
    }
    let {onSelect} = props;
     onSelect && onSelect(evt);
    

  };

  const _onInvsPaging = (evt: any) => {
    // console.log('Paging event', evt);
    setFishPondsTblData(evt.first);
  };

  const _onSort = (evt: any) => {
    console.log('sort event', evt);
    // Process multisort
    // let newMeta = [...evt.multiSortMeta];
    // let sortFds = newMeta.map((sm) => sm.field);
    // for (let sm of sortMeta) {
    //   if (!sortFds.includes(sm.field)) {
    //     sortFds.push(sm.field);
    //     newMeta.push(sm);
    //   }
    // }
    // setSortMeta([...newMeta]);

    //Single sort
    let newMeta = sortMeta.filter((sm) => sm.field !== evt.sortField);
    newMeta = [
      {
        field: evt.sortField,
        order: evt.sortOrder,
      },
      ...newMeta,
    ];
    // console.log('new sort meta: ', newMeta);
    setSortField(evt.sortField);
    setSortOrder(evt.sortOrder);
    setSortMeta(newMeta);
  };

  const _renderDeviceTypeCol: TblColRender = (row: any, col: any) => {
    let {deviceType} = row; 

    if (deviceType === 'CONTROL') return 'Thiết bị điều khiển';
    else if (deviceType === 'SENSOR') return  'Thiết bị cảm biến';
    else return "Thiết bị quét mã";
    
   
  };


  return (
    <>
      <Toast ref={toastRef} />
      {selMode === 'single' && (
        <DataTable
          header={header || t('factory.title')}
          value={fishPondsTblData}
          dataKey="id"
          lazy={true}
          paginator={true}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={fishPondsTblLimit}
          first={fishPondsTblStart}
          totalRecords={fishPondsTblNbRows}
          resizableColumns={true}
          columnResizeMode="expand"
          selectionMode="single"
          selection={selFishPond}
          onSelectionChange={_onFishPondSelected}
          onPage={_onInvsPaging}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={_onSort}>
          <Column
            field="code"
            header="Mã ao cá"
            headerStyle={{width: 120}}
          />
          <Column
            field="name"
            header="Tên ao cá"
            headerStyle={{width: 200}}
          />
          <Column
            field="numberOfFish"
            header="Số lượng cá trong ao"
            headerStyle={{width: 200}}
          />        
          <Column
            field="description"
            header="Ghi chú"
            headerStyle={{width: 300}}
          />
          <Column
            field="id"
            header="#"
            headerStyle={{width: 100}}
            headerClassName="text-right pr-4"
            bodyClassName="text-right pr-4"
          />
        </DataTable>
      )}

      {selMode !== 'single' && (
        <DataTable
          header={header || t('factory.title')}
          value={fishPondsTblData}
          dataKey="id"
          lazy={true}
          paginator={true}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={fishPondsTblLimit}
          first={fishPondsTblStart}
          totalRecords={fishPondsTblNbRows}
          resizableColumns={true}
          columnResizeMode="expand"
          selection={selFishPonds}
          onSelectionChange={_onFishPondSelected}
          onPage={_onInvsPaging}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={_onSort}>
          <Column
            selectionMode="multiple"
            headerStyle={{width: 50}}
            headerClassName="text-left"
            bodyClassName="text-left"></Column>
          <Column
            field="code"
            header="Mã ao cá"
            headerStyle={{width: 120}}
          />
         <Column
            field="name"
            header="Tên ao cá"
            headerStyle={{width: 200}}
          />
           <Column
            field="numberOfFish"
            header="Số lượng cá trong ao"
            headerStyle={{width: 200}}
          />
          <Column
            field="description"
            header="Ghi chú"
            headerStyle={{width: 300}}
          />

          <Column
            field="id"
            header="#"
            headerStyle={{width: 100}}
            headerClassName="text-right pr-4"
            bodyClassName="text-right pr-4"
          />
        </DataTable>
      )}
    </>
  );
}
