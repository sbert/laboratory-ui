export class Artifact {

    code: string;
    name: string;

}

export class ArtifactVersion {

    number: string;
    editor: string;
    artifact: Artifact;

}

export class ArtifactInstance {

    artifactVersion: ArtifactVersion;
    environmentType: string;

}
