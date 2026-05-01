<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
    <meta charset="UTF-8">
    <title>Prendre RDV</title>
</head>
<body class="bg-light-blue">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card rdv-card shadow-lg p-4">
            <div class="row">
                <!-- Partie gauche : Logo et Titre -->
                <div class="col-md-5 text-center border-end d-flex flex-column justify-content-center align-items-center p-3">
                    <img src="assets/images/logo.png" alt="Sa7tiPlus Logo" class="img-fluid mb-3" style="max-width: 150px;">
                    <h2 class="h5 text-muted">Prendre un rendez-vous</h2>
                </div>

                <!-- Partie droite : Formulaire -->
                <div class="col-md-7 p-3">
                    <form method="get" action="Controller">
                        <input type="hidden" name="idRdv" value="${rdvToCreate.idRdv}">
                        
                        <div class="row mb-3">
    <div class="col-md-6">
        <label class="form-label text-muted small">Nom</label>
        <input type="text" name="nom" class="form-control bg-light" 
               value="${userConnecte.users[0].nom}" readonly>
    </div>
    <div class="col-md-6">
        <label class="form-label text-muted small">Prénom</label>
        <input type="text" name="prenom" class="form-control bg-light" 
               value="${userConnecte.users[0].prenom}" readonly>
    </div>
</div>
                        
                        <div class="mb-3">
                            <label class="form-label text-muted small">Date du rendez-vous</label>
                            <input type="date" name="dateRdv" class="form-control border-0 bg-light" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-muted small">Choisir une heure</label>
                            <input type="time" name="heure" class="form-control border-0 bg-light" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-muted small">Spécialité médicale</label>
                            <select name="specialite" class="form-select border-0 bg-light">
                                <option value="Cardiologie" ${rdvToCreate.specialite == 'Cardiologie' ? 'selected' : ''}>Cardiologie</option>
                                <option value="Ophtalmologie" ${rdvToCreate.specialite == 'Ophtalmologie' ? 'selected' : ''}>Ophtalmologie</option>
                                <option value="Dermatologie" ${rdvToCreate.specialite == 'Dermatologie' ? 'selected' : ''}>Dermatologie</option>
                                <option value="Généraliste" ${rdvToCreate.specialite == 'Généraliste' ? 'selected' : ''}>Généraliste</option>
                                <option value="Pédiatrie" ${rdvToCreate.specialite == 'Pédiatrie' ? 'selected' : ''}>Pédiatrie</option>
                                
                            </select>
                        </div>

                        <div class="d-flex gap-2 mt-4">
                            <button type="submit" name="btnRDV" value="Prendre RDV" class="btn btn-teal w-100">Prendre un rendez-vous</button>
                            <button type="submit" name="btnRDV" value="Annuler" class="btn btn-cancel w-50">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>