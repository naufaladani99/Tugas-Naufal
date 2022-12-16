import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik'
import LocationApi from '../../api/LocationApi'

export default function FormikEditLocationApi(props) {
    const [location,setLocation]=useState([])
    useEffect(() => {
        LocationApi.FindOne(props.id).then(data => {
            setLocation(data)
        })
    }, [])
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            locationId:props.id,
            streetAddress:location.streetAddress,
            postalCode:location.postalCode,
            city:location.city,
            stateProvince:location.stateProvince,
            country:location.country
        },
        onSubmit:async(values)=>{
            let payload = new FormData();
            payload.append('streetAddress',values.streetAddress)
            payload.append('postalCode',values.postalCode)
            payload.append('city',values.city)
            payload.append('stateProvince',values.stateProvince)
            payload.append('country',values.country)

            await LocationApi.UpdateFile(payload)
            .then(()=>{
                props.closeAdd();
                window.alert('Data Successfully Updated')
                props.onRefresh();
            })
        }
    })
    
  return (
    <div>
        <div>
                <label>Location ID : </label>
                <input
                    type="number"
                    name="locationId"
                    id="locationId"
                    value={formik.values.locationId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="locationId"
                />
            </div>
            <div>
                <label>Street Address : </label>
                <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="streetAddress"
                />
            </div>
            <div>
                <label>Postal Code : </label>
                <input
                    type="text"
                    name="locationId"
                    id="locationId"
                    value={formik.values.locationId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="locationId"
                />
            </div>
            <div>
                <label>City : </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="city"
                />
            </div>
            <div>
                <label>State Province : </label>
                <input
                    type="text"
                    name="stateProvince"
                    id="stateProvince"
                    value={formik.values.stateProvince}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="stateProvince"
                />
            </div>
            <div>
                <label>Country : </label>
                <input
                    type="number"
                    name="country"
                    id="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="country"
                />
            </div>
            <div>
                <button type='submit' onClick={formik.handleSubmit}> Simpan </button>
                <button onClick={() => props.setDisplay(false)}> Cancel </button>
            </div>
    </div>
  )
}
