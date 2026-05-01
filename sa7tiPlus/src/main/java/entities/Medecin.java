package entities;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the medecin database table.
 * 
 */
@Entity
@NamedQueries({
    @NamedQuery(name="Medecin.findAll", query="SELECT m FROM Medecin m"),
    @NamedQuery(name="Medecin.findSpecialty", query="SELECT m.specialite FROM Medecin m WHERE m.specialite = ?1")
})

public class Medecin implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private int idUser;

	private String specialite;
	
	

	//bi-directional many-to-one association to Dossier
	@OneToMany(mappedBy="medecin", fetch=FetchType.EAGER)
	private List<Dossier> dossiers;

	//bi-directional one-to-one association to User
	@OneToOne
	@JoinColumn(name="id_user")
	private User user;

	//bi-directional many-to-one association to Rdv
	@OneToMany(mappedBy="medecin", fetch=FetchType.EAGER)
	private List<Rdv> rdvs;

	public Medecin() {
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getSpecialite() {
		return this.specialite;
	}

	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}

	public List<Dossier> getDossiers() {
		return this.dossiers;
	}

	public void setDossiers(List<Dossier> dossiers) {
		this.dossiers = dossiers;
	}

	public Dossier addDossier(Dossier dossier) {
		getDossiers().add(dossier);
		dossier.setMedecin(this);

		return dossier;
	}

	public Dossier removeDossier(Dossier dossier) {
		getDossiers().remove(dossier);
		dossier.setMedecin(null);

		return dossier;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Rdv> getRdvs() {
		return this.rdvs;
	}

	public void setRdvs(List<Rdv> rdvs) {
		this.rdvs = rdvs;
	}

	public Rdv addRdv(Rdv rdv) {
		getRdvs().add(rdv);
		rdv.setMedecin(this);

		return rdv;
	}

	public Rdv removeRdv(Rdv rdv) {
		getRdvs().remove(rdv);
		rdv.setMedecin(null);

		return rdv;
	}

}