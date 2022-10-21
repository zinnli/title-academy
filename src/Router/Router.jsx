import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import Register from "../page/Register";
import Main from "../page/Main";
import Write from "../page/Write";
import Detail from "../page/Detail";
const Router = () => {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />

                    <Route path="/write/:id" element={<Write />} />
                    <Route path="/write" element={<Write />} />

                    <Route path="/detail" element={<Detail />} />
                    <Route path="/detail/:id" element={<Detail />} />
               </Routes>
          </BrowserRouter>
     );
};

export default Router;
