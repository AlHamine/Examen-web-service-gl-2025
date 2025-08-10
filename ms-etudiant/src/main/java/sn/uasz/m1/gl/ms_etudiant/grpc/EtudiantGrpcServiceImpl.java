package sn.uasz.m1.gl.ms_etudiant.grpc;

import io.grpc.stub.StreamObserver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.grpc.server.service.GrpcService;

import sn.uasz.m1.gl.ms_etudiant.repository.EtudiantRepository;
import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;  // Entité métier

import java.util.List;

@GrpcService
public class EtudiantGrpcServiceImpl extends EtudiantServiceGrpc.EtudiantServiceImplBase {

    @Autowired
    private EtudiantRepository repository;
@Override
public void getEtudiantsByClasseId(ClasseRequest request, StreamObserver<EtudiantListResponse> responseObserver) {
    try {
        List<Etudiant> etudiantsModel = repository.findByClasseId(request.getClasseId());

        EtudiantListResponse.Builder responseBuilder = EtudiantListResponse.newBuilder();

        for (Etudiant e : etudiantsModel) {
            sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant grpcEtudiant =
                sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant.newBuilder()
                    .setId(e.getId() != null ? e.getId() : "")
                    .setMatricule(e.getMatricule() != null ? e.getMatricule() : "")
                    .setNom(e.getNom() != null ? e.getNom() : "")
                    .setPrenom(e.getPrenom() != null ? e.getPrenom() : "")
                    .setTelephone(e.getTelephone() != null ? e.getTelephone() : "")
                    .setAdresse(e.getAdresse() != null ? e.getAdresse() : "")
                    .setClasseId(e.getClasseId() != null ? e.getClasseId() : "")
                    .build();

            responseBuilder.addEtudiants(grpcEtudiant);
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    } catch (Exception ex) {
        responseObserver.onError(io.grpc.Status.INTERNAL
            .withDescription("Erreur lors de la récupération des étudiants")
            .withCause(ex)
            .asRuntimeException());
    }
}
}
