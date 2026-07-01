import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import {useEffect,useState} from "react";
import { getCompanies,updateCompany,deleteCompany,createCompany } from "./Services/CompanyService";
import type {Company} from "./types/Company"

function App(){
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<Error | null>(null)
  const [companies,setCompanies] = useState<Company[]>([]);

  function toError(error: unknown): Error {
    return error instanceof Error ? error : new Error("Something went wrong");
  }

  async function fetchCompanies() {
    setLoading(true);
    try {
      
      const companies = await getCompanies();
      setCompanies(companies);
    } catch (error) {
      setError(toError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(company:Company){
    try{
      const updatedCompany = await updateCompany(company.id,company);
      setCompanies((currentCompanies) =>
        currentCompanies.map((item) => (item.id === updatedCompany.id ? updatedCompany : item))
      );
    }catch(error){
      setError(toError(error));
    }
  }

  async function handleDelete(id:number){
    try{
      await deleteCompany(id);
      setCompanies((currentCompanies) => currentCompanies.filter((company) => company.id !== id));
    }catch(error){
      setError(toError(error));
    }
  }

  async function handleAdd(company:Company){
    try{
      const newCompany = await createCompany(company);
      setCompanies((currentCompanies) => [...currentCompanies,newCompany]);
    }catch(error){
      setError(toError(error));
    }
  }


  useEffect(() => {
    fetchCompanies();
  }, []);
  
  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error.message}</div>
  }
  
  return(
    <>
    <NavBar />
    {/* <Welcome /> */}
    <br />
    <CompanyCard 
    companies={companies}
    onedit={handleEdit}
    ondelete={handleDelete}
    onadd={handleAdd}
    />
    <JobCard />
    <Footer />
    </>
  )
}

export default App