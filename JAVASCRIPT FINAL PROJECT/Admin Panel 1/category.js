let arr = [];

// LOCAL STOREG
const addcat = () => {
    let cname = document.catfrm.kname.value;
    let cid = document.catfrm.catid.value;

    let data = JSON.parse(localStorage.getItem("catInfo"));
    let len = (data != null) ? data.length : 0;


    if (cid != "") {
        // upddate
        data.forEach((i) => {
            if (i.id == cid) {
                i.catname = cname;
            }
        });
        arr = data;
    } else {
        // insert
        let obj = {
            "id": len + 1,
            "catname": cname,
        };
        arr.push(obj);

    }
    localStorage.setItem("catInfo", JSON.stringify(arr));
    document.catfrm.kname.value = "";
    document.catfrm.catid.value = "";

    dispCat();
    return false;
}



//ADD  DISPLY STOREG

const dispCat = () => {
    let tr = '';

    let data = JSON.parse(localStorage.getItem("catInfo"));
    if (data != null) {
        data.forEach((i) => {
            tr += `<tr>
                <td>${i.id}</td>
                <td>${i.catname}</td>
                <td>
                <button type="button" onclick="editData(${i.id})">Edit</button>
                <button type="button" onclick="delData(${i.id})">Delete</button></td>
    
            </tr>`;
        });
    }
    document.getElementById("allCatData").innerHTML = tr;
}
dispCat();






//DELETE DISPLY STOREG

const delData = (id) => {
    let data = JSON.parse(localStorage.getItem("catInfo"));
    let finRsult = data.filter((i) => {
        return i.id != id;
    });

    let a = 1;
    let res = finRsult.map((i) => {
        i.id = a++;
        return i;
    });

    localStorage.setItem("catInfo", JSON.stringify(res));
    dispCat();
};


// UPDATE 
const editData = (id) => {
    let data = JSON.parse(localStorage.getItem("catInfo"));
    let finRsult = data.filter((i) => {
        return i.id == id;
    });
    finRsult.map((i) => {
        document.catfrm.kname.value = i.catname;
        document.catfrm.catid.value = i.id;
    });
};