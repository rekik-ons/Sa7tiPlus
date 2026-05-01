package entities;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the patient database table.
 * 
 */
@Entity
@NamedQueries({
    @NamedQuery(name="Patient.findAll", query="SELECT p FROM Patient p"),
    @NamedQuery(name="Patient.findByName", query="SELECT p FROM Patient p WHERE p.user.nom =:nom AND p.user.prenom =:prenom")
})

public class Patient implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private int idUser;

	//bi-directional many-to-one association to Dossier
	@OneToMany(mappedBy="patient", fetch=FetchType.EAGER)
	private List<Dossier> dossiers;

	//bi-directional many-to-one association to Dossier
	@ManyToOne
	@JoinColumn(name="id_dossier")
	private Dossier dossier;

	//bi-directional one-to-one association to User
	@OneToOne
	@JoinColumn(name="id_user")
	private User user;

	//bi-directional many-to-one association to Rdv
	@OneToMany(mappedBy="patient", fetch=FetchType.EAGER)
	private List<Rdv> rdvs;

	public Patient() {
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public List<Dossier> getDossiers() {
		return this.dossiers;
	}

	public void setDossiers(List<Dossier> dossiers) {
		this.dossiers = dossiers;
	}

	public Dossier addDossier(Dossier dossier) {
		getDossiers().add(dossier);
		dossier.setPatient(this);

		return dossier;
	}

	public Dossier removeDossier(Dossier dossier) {
		getDossiers().remove(dossier);
		dossier.setPatient(null);

		return dossier;
	}

	public Dossier getDossier() {
		return this.dossier;
	}

	public void setDossier(Dossier dossier) {
		this.dossier = dossier;
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
		rdv.setPatient(this);

		return rdv;
	}

	public Rdv removeRdv(Rdv rdv) {
		getRdvs().remove(rdv);
		rdv.setPatient(null);

		return rdv;
	}

}