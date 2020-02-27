export class general_settings {
    single: {
        flash: string;
        is_multi_box: boolean;
        api_call: boolean;
        allow_rts: boolean;
        groovelytic_stat: boolean;
        product_activity: boolean;
        custom_product_fields: boolean;
        time_zones: object;
        current_time: string;
        scheduled_import_toggle: boolean;
        to_import: string;
        from_import: string;
        time_to_import_orders: string;
        custom_field_one: string;
        custom_field_two: string;
        time_to_send_email: string;
        time_zone: string;
        dst: boolean;
        inventory_tracking: boolean;
        low_inventory_alert_email: boolean;
        low_inventory_email_address: string;
    }
}

export class confirmation_hash {
  inventory_tracking: boolean;
}

export class  Time {
  hour: Number;
  minute: Number;
  second: Number
}