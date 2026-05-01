<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Mes Rendez-vous - Sa7tiPlus</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="sbody">

<div class="container py-4">
    <!-- Header: Logo et Déconnexion -->
    <div class="row align-items-center mb-4">
        <div class="col">
            <img src="assets/images/logo.png" class="logo-img" alt="logo" style="max-height: 50px;">
        </div>
        <div class="col text-end">
            <a href="Controller?myBtn=deconnexion" class="btn btn-outline-dark btn-sm">Déconnexion</a>
        </div>
    </div>

    <!-- Titre et Bouton Créer -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="h4 mb-0">Mes Consultations</h2>
        <form action="Controller" method="get">
            <button type="submit" name="myBtn" value="Créer RDV" class="btn btn-primary">Créer RDV</button>
        </form>
    </div>

    <!-- Grille des Rendez-vous -->
    <div class="row">
        <c:forEach var="r" items="${mesRdvs}">
            <div class="col-md-4 mb-4">
                <div class="card custom-card shadow-sm bg-white border-0">
                    
                    <!-- Badge de statut dynamique -->
                    <div class="status ${r.statut == 'Confirmé' ? 'gray' : 'green'}">
                        ${r.statut}
                    </div>					
                    
                    <div class="card-body mt-2">
                        <h5 class="card-title text-primary">${r.specialite}</h5>
                        <p class="mb-1"><strong>Date :</strong> ${r.date_RDV}</p>
                        <p><strong>Horaire :</strong> ${r.heure_RDV}</p>

                        <!-- Actions : Archiver / Modifier -->
                        <form action="Controller" method="get" class="d-flex justify-content-between gap-2 mt-3">
                            <input type="hidden" name="id" value="${r.idRdv}"> 
                            
                            <button type="submit" name="myBtn" value="archiver" class="btn btn-sm btn-outline-danger flex-grow-1">
                                Archiver
                            </button>
                            <button type="submit" name="myBtn" value="Modifier" class="btn btn-sm btn-outline-primary flex-grow-1">
                                Modifier
                            </button>
                        </form>
                    </div>
                </div> <!-- Fin de la carte -->
            </div>
        </c:forEach>
    </div>

    <!-- Message si la liste est vide -->
    <c:if test="${empty mesRdvs}">
        <div class="alert alert-info text-center mt-5">
            Vous n'avez aucun rendez-vous enregistré.
        </div>
    </c:if>
</div>

</body>
</html>