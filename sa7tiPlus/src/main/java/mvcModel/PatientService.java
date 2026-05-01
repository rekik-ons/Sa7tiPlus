package mvcModel;

import entities.Medecin;
import entities.Patient;
import entities.Profil;
import entities.Rdv;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

/**
 * Session Bean implementation class PatientService
 */
@Stateless
@LocalBean
public class PatientService {
	@PersistenceContext(unitName="sa7tiPlus")
	private EntityManager em;
    /**
     * Default constructor. 
     */
    public PatientService() {
        // TODO Auto-generated constructor stub
    }
    
    public void modifierRDV(Rdv r) {
        em.merge(r); 
    }

    
    public Patient trouvPatientNomPrenom(String nom, String prenom) {
    	try {
    		return em.createNamedQuery("Patient.findByName",Patient.class)
    		.setParameter("nom",nom)
    		.setParameter("prenom",prenom)
    		.getSingleResult();
    	}
    	catch (NoResultException e) {
            // C'est mieux de catcher spécifiquement l'absence de résultat
            System.out.println("Aucun patient trouvé pour : " + nom + " " + prenom);
            return null;
        }
    catch (Exception e) {
    	System.out.println("Erreur recherche patient : " + e.getMessage()); // AJOUTE CECI
        e.printStackTrace();
        return null;

    }
   }
}
