# example

Anh xem example trong 2 file AppLogin.js và FishPondList.js
Sau khi đăng nhập thành công sẽ dispatch authAction
Khi cần dùng api sẽ gọi

```javascript
const conf = useSelector((state) => state.settings);
const auth = useSelector((state) => state.auth);

const apiRef = useRef<?AdminApi>();

useEffect(() => {
// console.log('Effect // setup api');
let apiProps: ApiProps = {
...conf,
token: auth.token,
};
let api = new AdminApi(apiProps);
apiRef.current = api;
}, [conf, auth]);
```
