
export const blobToBase64 = async (blob) => {
    let reader = new FileReader();

    reader.readAsDataURL(blob);

    function loadData(obj){
        return new Promise((resolve) => {
            obj.onload = () => resolve(obj.result)
        });
    }

    const dataBase64 = await loadData(reader);

    return dataBase64;
};