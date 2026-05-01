package mvcModel;

import java.util.List;

import entities.Patient;
import entities.Rdv;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

/**
 * Session Bean implementation class RdvService
 */
@Stateless
@LocalBean
public class RdvService {
	@PersistenceContext(unitName="sa7tiPlus")
	private EntityManager em;
    /**
     * Default constructor. 
     */
    public RdvService() {
        // TODO Auto-generated constructor stub
    }
    
    public Rdv getRdvById(int id) {
    	 Rdv r = em.find(Rdv.class,id);
         if (r != null) {
             return r;
         }
         else {
        	 return null;
         }
         
    }
    
    public void prendreRDV(Rdv r) {
    	em.persist(r);
    }
    public void archiverRDV(Rdv r) {
    	try {
            // On utilise merge pour s'assurer que l'objet est attaché au contexte de persistance avant le remove
            em.remove(em.merge(r));
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression en base : " + e.getMessage());
            throw e;
        }
        }
    public Rdv trouverRDVParId(int id) {
        return em.find(Rdv.class, id);
    }
    	
    public Rdv modifierRDV(Rdv r) {
       
        Rdv rdvEnBase = em.find(Rdv.class, r.getIdRdv());

        if (rdvEnBase != null) {
            
            rdvEnBase.setDate_RDV(r.getDate_RDV());
            rdvEnBase.setHeure_RDV(r.getHeure_RDV());
            rdvEnBase.setSpecialite(r.getSpecialite());
            return rdvEnBase;
        }
        return null;
    }
    public List<Rdv> getRDVByPatient(int id){
    	return em.createNamedQuery("Rdv.findByPatient",Rdv.class)
    			.setParameter("id",id)
    			.getResultList();
    }
    
    }


