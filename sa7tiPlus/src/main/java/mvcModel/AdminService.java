package mvcModel;

import entities.Dossier;
import entities.Profil;
import entities.User;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

/**
 * Session Bean implementation class AdminService
 */
@Stateless
@LocalBean
public class AdminService {
	
	@PersistenceContext(unitName="sa7tiPlus")
	private EntityManager em;
    /**
     * Default constructor. 
     */
    public AdminService() {
        // TODO Auto-generated constructor stub
    }
    
    public void creerUser(User u) {
    	em.persist(u);
    }
    
    public Profil connexion(String login,String mdp) {
    	try {
            return em.createNamedQuery("Profil.findUser", Profil.class)
                     .setParameter(1, login)
                     .setParameter(2, mdp)
                     .getSingleResult();
        } catch (NoResultException e) {
            return null; // User inexistant 
        }
    }
    
    

}
