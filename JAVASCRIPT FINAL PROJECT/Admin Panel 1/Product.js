const getAllCategory = () => {
    let data = JSON.parse(localStorage.getItem("catInfo"));
    let opt = "<option>Select Category</option>";
    data.forEach((i) => {
        opt += `<option value="${i.id}">${i.catname}</option>`
    });
    document.getElementById("catid").innerHTML = opt;
    // addProduct();
};

getAllCategory();


let arr = [];
const addProduct = () => {
    let name = document.prodfrm.name.value;
    let price = document.prodfrm.price.value;
    let cid = document.prodfrm.catid.value;
    let pid = document.prodfrm.pid.value;

    let getdata = JSON.parse(localStorage.getItem("prodInfo"));
    let prImage = JSON.parse(localStorage.getItem("prodImage"));

    if (pid != "") {
        if (prImage != null) {
            getdata.map((i) => {
                if (i.id == pid) {
                    i.name = name;
                    i.price = price;
                    i.cid = cid;
                    i.image = prImage;
                }
            });
        } else {
            getdata.map((i) => {
                if (i.id == pid) {
                    i.name = name;
                    i.price = price;
                    i.cid = cid;
                }
            });
        }
        arr = getdata;
    } else {
        let len = getdata != null ? getdata.length : 0;
        let obj = {
            "id": len + 1,
            "name": name,
            "price": price,
            "cid": cid,
            "image": prImage,
        };
        arr.push(obj)
    };
    localStorage.setItem("prodInfo", JSON.stringify(arr));
    document.prodfrm.name.value = '';
    document.prodfrm.price.value = '';
    document.prodfrm.catid.value = '';
    document.prodfrm.pid.value = '';
    document.prodfrm.img.src = '';
    localStorage.removeItem("prodImage")


    dispProduct();


};






const dispProduct = () => {
    let tr = "";
    let data = JSON.parse(localStorage.getItem("prodInfo"));
    let catdata = JSON.parse(localStorage.getItem("catInfo"));

    if (data != null) {
        data.map((i, index) => {
            catdata.map((j) => {
                if (j.id == i.cid) {
                    i.category = j.catname;
                }
            });
            tr += `<tr>
            <td>${i.cid}</td>
            <td>${i.category}</td>
            <td>${i.name}</td>
            <td>${i.price}</td>
            <td><img src="${i.image}" height="50px" width="50px"</td>
            <td>
            <button type="button" onclick="editData(${i.id})">Edit</button>
            <button type="button" onclick="delData(${index})">Delete</button>
            </td>

        </tr>`;
        });
    };
    document.getElementById("allProdData").innerHTML = tr;

};

const delData = (id) => {
    let data = JSON.parse(localStorage.getItem("prodInfo"));
    data.splice(id, 1);
    let a = 1;
    let res = data.map((i) => {
        i.id = a++;
        return i;
    });
    localStorage.setItem("prodInfo", JSON.stringify(res));
    dispProduct();
};



const editData = (id) => {
    let data = JSON.parse(localStorage.getItem("prodInfo"));

    data.map((i) => {
        if (i.id == id) {
            document.prodfrm.name.value = i.name;
            document.prodfrm.price.value = i.price;
            document.prodfrm.catid.value = i.cid;
            document.prodfrm.pid.value = i.id;
            document.prodfrm.img.src = i.image;

        }
    });
};

const displayImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function (event) {
        document.prodfrm.img.src = event.target.result;
        localStorage.setItem("prodImage", JSON.stringify(event.target.result));
    };
};
dispProduct();

