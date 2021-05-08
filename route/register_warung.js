const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");

const db = admin.firestore()

router.post('/insert_warung' , async (req,res)=>{
    const {foto,latitude,longitude,alamat_pemilik,rating,alamat_warung,email,
        fotoktp,fotowarung,provinsi,kota,kecamatan,kelurahan,kode_sales,namapemilik,namatoko,nib,nik,no_hp_pemilik,no_hp_warung,
    password,username} = req.body

    jumlah_degre = (latitude+90)*180+longitude 

    if(foto!=null,latitude!=null,longitude!=null,alamat_pemilik!=null,rating!=null,alamat_warung!=null,email!=null,fotoktp!=null,
        fotowarung!=null,provinsi!=null,kota!=null,kecamatan!=null,kelurahan!=null,kode_sales!=null,namapemilik!=null,
        namatoko!=null,nib!=null,nik!=null,no_hp_pemilik!=null,no_hp_warung!=null,password!=null,username!=null){

            var enamdua = "+62"
            var notelp = enamdua + no_hp_warung
            admin.auth().createUser({
                email : username,
                phoneNumber:notelp,
                password:password,
                displayName:namapemilik,
                photoURL:fotoktp
            }).then((
                userRecord)=>{
                    const register_ref = db.collection('Warung_akun').doc(userRecord.uid)
                    register_ref.set({
                        alamat_pemilik : alamat_pemilik,
                        rating : rating,
                        geoFireLocation : jumlah_degre,
                        alamat_warung : alamat_warung,
                        email : email,
                        fotoktp : fotoktp,
                        fotowarung : fotowarung,
                        kecamatan : kecamatan,
                        kelurahan : kelurahan,
                        kode_sales : kode_sales,
                        kota : kota,
                        latitude : latitude,
                        longitude : longitude,
                        namapemilik : namapemilik,
                        namatoko : namatoko,
                        nib : nib,
                        nik : nik,
                        no_hp_pemilik : no_hp_pemilik,
                        no_hp_warung : no_hp_warung,
                        password : password,
                        provinsi : provinsi,
                        username : username,
                        status_aktivasi : Boolean(false),
                        uid : userRecord.uid,
                        tipe_akun : "warung",
                        status :  Boolean(false),
                        terjual : 0
                    })
                    return res.status(200).json({
                        status : res.statusCode,
                        message : "Pendaftaran warung berhasil",
                        uid : userRecord.uid
                    })
                }).catch((error)=>{
                    return res.status(200).json({
                        status : res.statusCode,
                        message : error
                    })
                })
        
        }else{
            return res.status(200).json({
                status : res.statusCode,
                message : "Isikan Semua kolom "
            })
        }



})

module.exports = router 