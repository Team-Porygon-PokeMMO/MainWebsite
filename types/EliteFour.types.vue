<script lang="ts">
export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Leads[] = [];
}
export class Leads {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
}
export class Region {
    Name: string = "";
    IsVisible: boolean = false;
    GymTrainers: Trainer[] = [];
}
</script>