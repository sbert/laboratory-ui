export class Artifact {

    id: number;
    artifactId: string;
    groupId: string;
    versions: ArtifactVersion[];

}

export class ArtifactVersion {

    number: string;
    artifact: Artifact;
    instances: ArtifactInstance[];

}

export class ArtifactInstance {

    artifactVersion: ArtifactVersion;
    environmentType: string;

    search: string;

}
