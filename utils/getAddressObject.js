import React, { useEffect } from 'react';

export default function getAddressObject(data) {
    const getAddressObject = (data) => {
        const ShouldBeComponent = {
            street_number: ['street_number', 'establishment', 'point_of_interest', 'transit_station'],
            postal_code: ['postal_code'],
            postal_town: ['postal_town'],
            street: ['street_address', 'route'],
            county: ['administrative_area_level_2'],
            province: [
                'administrative_area_level_1',
                'administrative_area_level_2',
                'administrative_area_level_3',
                'administrative_area_level_4',
                'administrative_area_level_5',
            ],
            city: [
                'locality',
                'sublocality',
                'sublocality_level_1',
                'sublocality_level_2',
                'sublocality_level_3',
                'sublocality_level_4',
            ],
            country: ['country'],
        }

        let address = {
            street_number: '',
            postal_code: '',
            postal_town: '',
            street: '',
            province: '',
            city: '',
            country: '',
        }

        address_components.forEach((component) => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    if (shouldBe === 'locality') {
                        address[shouldBe] = component.short_name
                    } else {
                        address[shouldBe] = component.long_name
                    }
                }
            }
        })

        // Fix the shape to match our schema
        address.address = address.street_number + ' ' + address.street
        delete address.street_number
        delete address.street
        return address
    }

    return [() => getAddressObject()];
}
