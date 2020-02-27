export class paramsModel{
    filter: string;
  }
  
  export class toParams{
    order_id: string;
    new_order: boolean;
  }
  
  export class orderListData{
    list: [];
    selected: [];
    single: {};
    load_new: boolean;
    current: number;
    setup: {
      sort: string;
      order: string;
      filter: string;
      search: string;
      select_all: boolean;
      inverted: boolean;
      limit: number;
      offset: number;
      status: string;
      reallocate_inventory: boolean;
      orderArray: []
    };
    orders_count: {};
    product_search_toggle: string;
  }
  
  export class gridOptions{
    paginate: {
      total_items: any
      show: boolean
    };
    selections: {
      selected_count: any
    };
    allFields: {
      customFieldOne: {
        name: string,
        hidden: boolean,
        col_length: number,
        enable_edit: boolean
      };
      customFieldTwo: {
        name: string,
        hidden: boolean,
        col_length: number,
        enable_edit: boolean
      }
    }
  }
  
  export class allowStatusChanges{
    scanned: boolean;
    cancelled: boolean
  }
  
  export class generalSettings{
    single: {
      customFieldOne: string;
      customFieldTwo: string;
      searchByProduct: string
    }
  }
  
  export class Options{
    idle: number;
  }