// Import the express and fetch libraries
const express = require('express');
const fetch = require("node-fetch");

// Create a new express application
const app = express();

const datamap = {
    "listings" : {
        "count": 3,
        "results": [
            {
                "listing_id": 1,
                "user_id": 1,
                "shop_id": 1,
                "title": "string",
                "description": "string",
                "state": "active",
                "creation_timestamp": 946684800,
                "created_timestamp": 946684800,
                "ending_timestamp": 946684800,
                "original_creation_timestamp": 946684800,
                "last_modified_timestamp": 946684800,
                "updated_timestamp": 946684800,
                "state_timestamp": 946684800,
                "quantity": 0,
                "shop_section_id": 1,
                "featured_rank": 0,
                "url": "string",
                "num_favorers": 0,
                "non_taxable": true,
                "is_taxable": true,
                "is_customizable": true,
                "is_personalizable": true,
                "personalization_is_required": true,
                "personalization_char_count_max": 0,
                "personalization_instructions": "string",
                "listing_type": "physical",
                "tags": [
                    "string"
                ],
                "materials": [
                    "string"
                ],
                "shipping_profile_id": 1,
                "return_policy_id": 1,
                "processing_min": 0,
                "processing_max": 0,
                "who_made": "i_did",
                "when_made": "made_to_order",
                "is_supply": true,
                "item_weight": 0,
                "item_weight_unit": "oz",
                "item_length": 0,
                "item_width": 0,
                "item_height": 0,
                "item_dimensions_unit": "in",
                "is_private": true,
                "style": [
                    "string"
                ],
                "file_data": "string",
                "has_variations": true,
                "should_auto_renew": true,
                "language": "string",
                "price": {
                    "amount": 0,
                    "divisor": 0,
                    "currency_code": 'ISO'
                },
                "taxonomy_id": 0,
                "shipping_profile": {
                    "shipping_profile_id": 1,
                    "title": "string",
                    "user_id": 1,
                    "min_processing_days": 0,
                    "max_processing_days": 0,
                    "processing_days_display_label": "string",
                    "origin_country_iso": "string",
                    "is_deleted": true,
                    "shipping_profile_destinations": [
                        {
                            "shipping_profile_destination_id": 1,
                            "shipping_profile_id": 1,
                            "origin_country_iso": "string",
                            "destination_country_iso": "string",
                            // "destination_region": "US",
                            "primary_cost": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_cost": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 1,
                            "max_delivery_days": 1
                        }
                    ],
                    "shipping_profile_upgrades": [
                        {
                            "shipping_profile_id": 1,
                            "upgrade_id": 1,
                            "upgrade_name": "string",
                            "type": "0",
                            "rank": 0,
                            "language": "string",
                            "price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 1,
                            "max_delivery_days": 1
                        }
                    ],
                    "origin_postal_code": "string",
                    "profile_type": "manual",
                    "domestic_handling_fee": 0,
                    "international_handling_fee": 0
                },
                "user": {
                    "user_id": 1,
                    "primary_email": "user@example.com",
                    "first_name": "string",
                    "last_name": "string",
                    "image_url_75x75": "string"
                },
                "shop": {
                    "shop_id": 1,
                    "user_id": 1,
                    "shop_name": "string",
                    "create_date": 0,
                    "created_timestamp": 0,
                    "title": "string",
                    "announcement": "string",
                    "currency_code": "string",
                    "is_vacation": true,
                    "vacation_message": "string",
                    "sale_message": "string",
                    "digital_sale_message": "string",
                    "update_date": 0,
                    "updated_timestamp": 0,
                    "listing_active_count": 0,
                    "digital_listing_count": 0,
                    "login_name": "string",
                    "accepts_custom_requests": true,
                    "policy_welcome": "string",
                    "policy_payment": "string",
                    "policy_shipping": "string",
                    "policy_refunds": "string",
                    "policy_additional": "string",
                    "policy_seller_info": "string",
                    "policy_update_date": 0,
                    "policy_has_private_receipt_info": true,
                    "has_unstructured_policies": true,
                    "policy_privacy": "string",
                    "vacation_autoreply": "string",
                    "url": "string",
                    "image_url_760x100": "string",
                    "num_favorers": 0,
                    "languages": [
                        "string"
                    ],
                    "icon_url_fullxfull": "string",
                    "is_using_structured_policies": true,
                    "has_onboarded_structured_policies": true,
                    "include_dispute_form_link": true,
                    "is_direct_checkout_onboarded": true,
                    "is_etsy_payments_onboarded": true,
                    "is_calculated_eligible": true,
                    "is_opted_in_to_buyer_promise": true,
                    "is_shop_us_based": true,
                    "transaction_sold_count": 0,
                    "shipping_from_country_iso": "string",
                    "shop_location_country_iso": "string",
                    "review_count": 0,
                    "review_average": 0
                },
                "images": [
                    {
                        "listing_id": 1,
                        "listing_image_id": 1,
                        "hex_code": "string",
                        "red": 0,
                        "green": 0,
                        "blue": 0,
                        "hue": 0,
                        "saturation": 0,
                        "brightness": 0,
                        "is_black_and_white": true,
                        "creation_tsz": 0,
                        "created_timestamp": 0,
                        "rank": 0,
                        "url_75x75": "string",
                        "url_170x135": "string",
                        "url_570xN": "string",
                        "url_fullxfull": "string",
                        "full_height": 0,
                        "full_width": 0,
                        "alt_text": "string"
                    }
                ],
                "videos": [
                    {
                        "video_id": 1,
                        "height": 0,
                        "width": 0,
                        "thumbnail_url": "string",
                        "video_url": "string",
                        "video_state": "active"
                    }
                ],
                "inventory": {
                    "products": [
                        {
                            "product_id": 1,
                            "sku": "string",
                            "is_deleted": true,
                            "offerings": [
                                {
                                    "offering_id": 1,
                                    "quantity": 0,
                                    "is_enabled": true,
                                    "is_deleted": true,
                                    "price": {
                                        "amount": 0,
                                        "divisor": 0,
                                        "currency_code": "string"
                                    }
                                }
                            ],
                            "property_values": [
                                {
                                    "property_id": 1,
                                    "property_name": "string",
                                    "scale_id": 1,
                                    "scale_name": "string",
                                    "value_ids": [
                                        1
                                    ],
                                    "values": [
                                        "string"
                                    ]
                                }
                            ]
                        }
                    ],
                    "price_on_property": [
                        0
                    ],
                    "quantity_on_property": [
                        0
                    ],
                    "sku_on_property": [
                        0
                    ]
                },
                "production_partners": [
                    {
                        "production_partner_id": 1,
                        "partner_name": "string",
                        "location": "string"
                    }
                ],
                "skus": [
                    "string"
                ],
                "translations": [
                    {
                        "listing_id": 1,
                        "language": "string",
                        "title": "string",
                        "description": "string",
                        "tags": [
                            "string"
                        ]
                    }
                ],
                "views": 10
            },
            {
                "listing_id": 2,
                "user_id": 1,
                "shop_id": 1,
                "title": "string",
                "description": "string",
                "state": "active",
                "creation_timestamp": 946684800,
                "created_timestamp": 946684800,
                "ending_timestamp": 946684800,
                "original_creation_timestamp": 946684800,
                "last_modified_timestamp": 946684800,
                "updated_timestamp": 946684800,
                "state_timestamp": 946684800,
                "quantity": 19,
                "shop_section_id": 1,
                "featured_rank": 0,
                "url": "string",
                "num_favorers": 20,
                "non_taxable": true,
                "is_taxable": true,
                "is_customizable": true,
                "is_personalizable": true,
                "personalization_is_required": true,
                "personalization_char_count_max": 0,
                "personalization_instructions": "string",
                "listing_type": "physical",
                "tags": [0,0],
                "materials": [
                    "string"
                ],
                "shipping_profile_id": 1,
                "return_policy_id": 1,
                "processing_min": 14,
                "processing_max": 10,
                "who_made": "i_did",
                "when_made": "made_to_order",
                "is_supply": true,
                "item_weight": 0,
                "item_weight_unit": "oz",
                "item_length": 0,
                "item_width": 0,
                "item_height": 0,
                "item_dimensions_unit": "in",
                "is_private": true,
                "style": [
                    "string"
                ],
                "file_data": "string",
                "has_variations": true,
                "should_auto_renew": true,
                "language": "string",
                "price": {
                    "amount": 13,
                    "divisor": 110,
                    "currency_code": "string"
                },
                "taxonomy_id": 0,
                "shipping_profile": {
                    "shipping_profile_id": 1,
                    "title": "string",
                    "user_id": 1,
                    "min_processing_days": 0,
                    "max_processing_days": 0,
                    "processing_days_display_label": "string",
                    "origin_country_iso": "us",
                    "is_deleted": true,
                    "shipping_profile_destinations": [
                        {
                            "shipping_profile_destination_id": 1,
                            "shipping_profile_id": 1,
                            "origin_country_iso": "us",
                            "destination_country_iso": "string",
                            "destination_region": "us",
                            "primary_cost": {
                                "amount": 220,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_cost": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 2,
                            "max_delivery_days": 11
                        }
                    ],
                    "shipping_profile_upgrades": [
                        {
                            "shipping_profile_id": 1,
                            "upgrade_id": 1,
                            "upgrade_name": "string",
                            "type": "0",
                            "rank": 0,
                            "language": "string",
                            "price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 1,
                            "max_delivery_days": 1
                        }
                    ],
                    "origin_postal_code": "string",
                    "profile_type": "manual",
                    "domestic_handling_fee": 0,
                    "international_handling_fee": 0
                },
                "user": {
                    "user_id": 1,
                    "primary_email": "user@example.com",
                    "first_name": "string",
                    "last_name": "string",
                    "image_url_75x75": "string"
                },
                "shop": {
                    "shop_id": 1,
                    "user_id": 1,
                    "shop_name": "string",
                    "create_date": 0,
                    "created_timestamp": 0,
                    "title": "string",
                    "announcement": "string",
                    "currency_code": "string",
                    "is_vacation": true,
                    "vacation_message": "string",
                    "sale_message": "string",
                    "digital_sale_message": "string",
                    "update_date": 0,
                    "updated_timestamp": 0,
                    "listing_active_count": 0,
                    "digital_listing_count": 0,
                    "login_name": "string",
                    "accepts_custom_requests": true,
                    "policy_welcome": "string",
                    "policy_payment": "string",
                    "policy_shipping": "string",
                    "policy_refunds": "string",
                    "policy_additional": "string",
                    "policy_seller_info": "string",
                    "policy_update_date": 0,
                    "policy_has_private_receipt_info": true,
                    "has_unstructured_policies": true,
                    "policy_privacy": "string",
                    "vacation_autoreply": "string",
                    "url": "string",
                    "image_url_760x100": "string",
                    "num_favorers": 0,
                    "languages": [
                        "string"
                    ],
                    "icon_url_fullxfull": "string",
                    "is_using_structured_policies": true,
                    "has_onboarded_structured_policies": true,
                    "include_dispute_form_link": true,
                    "is_direct_checkout_onboarded": true,
                    "is_etsy_payments_onboarded": true,
                    "is_calculated_eligible": true,
                    "is_opted_in_to_buyer_promise": true,
                    "is_shop_us_based": true,
                    "transaction_sold_count": 0,
                    "shipping_from_country_iso": "string",
                    "shop_location_country_iso": "string",
                    "review_count": 0,
                    "review_average": 0
                },
                "images": [
                    {
                        "listing_id": 1,
                        "listing_image_id": 1,
                        "hex_code": "string",
                        "red": 0,
                        "green": 0,
                        "blue": 0,
                        "hue": 0,
                        "saturation": 0,
                        "brightness": 0,
                        "is_black_and_white": true,
                        "creation_tsz": 0,
                        "created_timestamp": 0,
                        "rank": 0,
                        "url_75x75": "string",//图片地址
                        "url_170x135": "string",//图片地址
                        "url_570xN": "string",//图片地址
                        "url_fullxfull": "string",//图片地址全尺寸
                        "full_height": 0,
                        "full_width": 0,
                        "alt_text": "string"
                    }
                ],
                "videos": [
                    {
                        "video_id": 1,
                        "height": 0,
                        "width": 0,
                        "thumbnail_url": "string",
                        "video_url": "striAng",//视频地址
                        "video_state": "active"
                    }
                ],
                "inventory": {
                    "products": [
                        {
                            "product_id": 1,
                            "sku": "string",
                            "is_deleted": true,
                            "offerings": [
                                {
                                    "offering_id": 1,
                                    "quantity": 0,
                                    "is_enabled": true,
                                    "is_deleted": true,
                                    "price": {
                                        "amount": 0,
                                        "divisor": 0,
                                        "currency_code": "string"
                                    }
                                }
                            ],
                            "property_values": [
                                {
                                    "property_id": 1,
                                    "property_name": "string",
                                    "scale_id": 1,
                                    "scale_name": "string",
                                    "value_ids": [
                                        1
                                    ],
                                    "values": [
                                        "string"
                                    ]
                                }
                            ]
                        }
                    ],
                    "price_on_property": [
                        0
                    ],
                    "quantity_on_property": [
                        0
                    ],
                    "sku_on_property": [
                        0
                    ]
                },
                "production_partners": [
                    {
                        "production_partner_id": 1,
                        "partner_name": "string",
                        "location": "string"
                    }
                ],
                "skus": [
                    "string"
                ],
                "translations": [
                    {
                        "listing_id": 1,
                        "language": "string",
                        "title": "string",
                        "description": "string",
                        "tags": [
                            "string"
                        ]
                    }
                ],
                "views": 234
            },
            {
                "listing_id": 3,
                "user_id": 1,
                "shop_id": 1,
                "title": "string",
                "description": "string",
                "state": "active",
                "creation_timestamp": 946684800,
                "created_timestamp": 946684800,
                "ending_timestamp": 946684800,
                "original_creation_timestamp": 946684800,
                "last_modified_timestamp": 946684800,
                "updated_timestamp": 946684800,
                "state_timestamp": 946684800,
                "quantity": 19,
                "shop_section_id": 1,
                "featured_rank": 0,
                "url": "string",
                "num_favorers": 20,
                "non_taxable": true,
                "is_taxable": true,
                "is_customizable": true,
                "is_personalizable": true,
                "personalization_is_required": true,
                "personalization_char_count_max": 0,
                "personalization_instructions": "string",
                "listing_type": "physical",
                "tags": [0,0],
                "materials": [
                    "string"
                ],
                "shipping_profile_id": 1,
                "return_policy_id": 1,
                "processing_min": 14,
                "processing_max": 10,
                "who_made": "i_did",
                "when_made": "made_to_order",
                "is_supply": true,
                "item_weight": 0,
                "item_weight_unit": "oz",
                "item_length": 0,
                "item_width": 0,
                "item_height": 0,
                "item_dimensions_unit": "in",
                "is_private": true,
                "style": [
                    "string"
                ],
                "file_data": "string",
                "has_variations": true,
                "should_auto_renew": true,
                "language": "string",
                "price": {
                    "amount": 13,
                    "divisor": 110,
                    "currency_code": "string"
                },
                "taxonomy_id": 0,
                "shipping_profile": {
                    "shipping_profile_id": 1,
                    "title": "string",
                    "user_id": 1,
                    "min_processing_days": 0,
                    "max_processing_days": 0,
                    "processing_days_display_label": "string",
                    "origin_country_iso": "us",
                    "is_deleted": true,
                    "shipping_profile_destinations": [
                        {
                            "shipping_profile_destination_id": 1,
                            "shipping_profile_id": 1,
                            "origin_country_iso": "us",
                            "destination_country_iso": "string",
                            "destination_region": "us",
                            "primary_cost": {
                                "amount": 220,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_cost": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 2,
                            "max_delivery_days": 11
                        }
                    ],
                    "shipping_profile_upgrades": [
                        {
                            "shipping_profile_id": 1,
                            "upgrade_id": 1,
                            "upgrade_name": "string",
                            "type": "0",
                            "rank": 0,
                            "language": "string",
                            "price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "secondary_price": {
                                "amount": 0,
                                "divisor": 0,
                                "currency_code": "string"
                            },
                            "shipping_carrier_id": 0,
                            "mail_class": "string",
                            "min_delivery_days": 1,
                            "max_delivery_days": 1
                        }
                    ],
                    "origin_postal_code": "string",
                    "profile_type": "manual",
                    "domestic_handling_fee": 0,
                    "international_handling_fee": 0
                },
                "user": {
                    "user_id": 1,
                    "primary_email": "user@example.com",
                    "first_name": "string",
                    "last_name": "string",
                    "image_url_75x75": "string"
                },
                "shop": {
                    "shop_id": 1,
                    "user_id": 1,
                    "shop_name": "string",
                    "create_date": 0,
                    "created_timestamp": 0,
                    "title": "string",
                    "announcement": "string",
                    "currency_code": "string",
                    "is_vacation": true,
                    "vacation_message": "string",
                    "sale_message": "string",
                    "digital_sale_message": "string",
                    "update_date": 0,
                    "updated_timestamp": 0,
                    "listing_active_count": 0,
                    "digital_listing_count": 0,
                    "login_name": "string",
                    "accepts_custom_requests": true,
                    "policy_welcome": "string",
                    "policy_payment": "string",
                    "policy_shipping": "string",
                    "policy_refunds": "string",
                    "policy_additional": "string",
                    "policy_seller_info": "string",
                    "policy_update_date": 0,
                    "policy_has_private_receipt_info": true,
                    "has_unstructured_policies": true,
                    "policy_privacy": "string",
                    "vacation_autoreply": "string",
                    "url": "string",
                    "image_url_760x100": "string",
                    "num_favorers": 0,
                    "languages": [
                        "string"
                    ],
                    "icon_url_fullxfull": "string",
                    "is_using_structured_policies": true,
                    "has_onboarded_structured_policies": true,
                    "include_dispute_form_link": true,
                    "is_direct_checkout_onboarded": true,
                    "is_etsy_payments_onboarded": true,
                    "is_calculated_eligible": true,
                    "is_opted_in_to_buyer_promise": true,
                    "is_shop_us_based": true,
                    "transaction_sold_count": 0,
                    "shipping_from_country_iso": "string",
                    "shop_location_country_iso": "string",
                    "review_count": 0,
                    "review_average": 0
                },
                "images": [
                    {
                        "listing_id": 1,
                        "listing_image_id": 1,
                        "hex_code": "string",
                        "red": 0,
                        "green": 0,
                        "blue": 0,
                        "hue": 0,
                        "saturation": 0,
                        "brightness": 0,
                        "is_black_and_white": true,
                        "creation_tsz": 0,
                        "created_timestamp": 0,
                        "rank": 0,
                        "url_75x75": "string",//图片地址
                        "url_170x135": "string",//图片地址
                        "url_570xN": "string",//图片地址
                        "url_fullxfull": "string",//图片地址全尺寸
                        "full_height": 0,
                        "full_width": 0,
                        "alt_text": "string"
                    }
                ],
                "videos": [
                    {
                        "video_id": 1,
                        "height": 0,
                        "width": 0,
                        "thumbnail_url": "string",
                        "video_url": "striAng",//视频地址
                        "video_state": "active"
                    }
                ],
                "inventory": {
                    "products": [
                        {
                            "product_id": 1,
                            "sku": "string",
                            "is_deleted": true,
                            "offerings": [
                                {
                                    "offering_id": 1,
                                    "quantity": 0,
                                    "is_enabled": true,
                                    "is_deleted": true,
                                    "price": {
                                        "amount": 0,
                                        "divisor": 0,
                                        "currency_code": "string"
                                    }
                                }
                            ],
                            "property_values": [
                                {
                                    "property_id": 1,
                                    "property_name": "string",
                                    "scale_id": 1,
                                    "scale_name": "string",
                                    "value_ids": [
                                        1
                                    ],
                                    "values": [
                                        "string"
                                    ]
                                }
                            ]
                        }
                    ],
                    "price_on_property": [
                        0
                    ],
                    "quantity_on_property": [
                        0
                    ],
                    "sku_on_property": [
                        0
                    ]
                },
                "production_partners": [
                    {
                        "production_partner_id": 1,
                        "partner_name": "string",
                        "location": "string"
                    }
                ],
                "skus": [
                    "string"
                ],
                "translations": [
                    {
                        "listing_id": 1,
                        "language": "string",
                        "title": "string",
                        "description": "string",
                        "tags": [
                            "string"
                        ]
                    }
                ],
                "views": 234
            }
        ]
    },
    "reviews":{
        count: 2,
        "results": [
            {
                "shop_id": 1,
                "listing_id": 1,
                "rating": 4,
                "review": "xx",
                "language": "",
                "image_url_fullxfull": 'string',
                "create_timestamp": 1693542515,
                "created_timestamp": 1693542515,
                "update_timestamp": 1693542515,
                "updated_timestamp": 1693542515
            },
            {
                "shop_id": 2,
                "listing_id": 2,
                "rating": 5,
                "review": "Great quality!! I love it.",
                "language": "en",
                "image_url_fullxfull": null,
                "create_timestamp": 1693522197,
                "created_timestamp": 1693522197,
                "update_timestamp": 1693525419,
                "updated_timestamp": 1693525419
            },
        ]
    },
    "video":{
        "count": 0,
        "results": [
            {
                "video_id": 1,
                "height": 0,
                "width": 0,
                "thumbnail_url": "string",
                "video_url": "string",
                "video_state": "active"
            }
        ]
    },
    "image":{
        "count": 2,
        "results": [
            {
                "listing_id": 1,
                "listing_image_id": 1,
                "hex_code": "string",
                "red": 0,
                "green": 0,
                "blue": 0,
                "hue": 0,
                "saturation": 0,
                "brightness": 0,
                "is_black_and_white": true,
                "creation_tsz": 0,
                "created_timestamp": 0,
                "rank": 0,
                "url_75x75": "string",
                "url_170x135": "string",
                "url_570xN": "string",
                "url_fullxfull": "string",
                "full_height": 0,
                "full_width": 0,
                "alt_text": "string"
            },
            {
                "listing_id": 1,
                "listing_image_id": 2,
                "hex_code": "string",
                "red": 0,
                "green": 0,
                "blue": 0,
                "hue": 0,
                "saturation": 0,
                "brightness": 0,
                "is_black_and_white": true,
                "creation_tsz": 0,
                "created_timestamp": 0,
                "rank": 0,
                "url_75x75": "string",
                "url_170x135": "string",
                "url_570xN": "string",
                "url_fullxfull": "string",
                "full_height": 0,
                "full_width": 0,
                "alt_text": "string"
            }
        ]
    },
}

const requestOptions = {
    'method': 'GET',
    'headers': {
        'x-api-key': '1aa2bb33c44d55eeeeee6fff',
    },
};

async function listingsController(listingids){
    try{
        const response = await fetch(
            'https://openapi.etsy.com/v3/application/listings/batch?'+ new URLSearchParams({
                listing_ids: listingids
            }).toString(),
            requestOptions
        );

        if (response.ok && response.status == 200) {
            let data =  await response.json();
            return {'status':'200',data};
        } else {
            return {'status':'200',data:datamap['listings']};//模拟正确的返回结果
            // return {'status':response.status,'text':response.statusText};
        }
    }catch (e) {
        return {'status':'200',data:datamap['listings']};//模拟正确的返回结果
    }
}

async function reviewsController(){
    try {
        const response = await fetch(
            'https://openapi.etsy.com/v3/application/shops/1512219752/listings/reviews',
            requestOptions
        );

        if (response.ok && response.status == 200) {
            let data =  await response.json();
            return {'status':'200',data};
        } else {
            return {'status':'200',data:datamap['reviews']};//模拟正确的返回结果
            // return {'status':response.status,'text':response.statusText};
        }
    }catch (e) {
        return {'status':'200',data:datamap['reviews']};//模拟正确的返回结果
    }

}

module.exports =  {listingsController,reviewsController}
