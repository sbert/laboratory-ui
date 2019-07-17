export class Artifact {

    artifactId: string;
    groupId: string;

}

export class ArtifactVersion {

    number: string;
    artifact: Artifact;

}

export class ArtifactInstance {

    artifactVersion: ArtifactVersion;
    environmentType: string;

    search: string;

}
