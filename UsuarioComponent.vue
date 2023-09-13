<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'nombrebd', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Datos Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="mb-2" v-bind="props">
                Nuevo Usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombrebd"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.apellidobd"
                        label="Apellidos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.telefonobd"
                        label="Telefono"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.correobd"
                        label="Correo Electronico"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Estas seguro de que quieres eliminarlo?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </template>
  
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            title: 'ID',
            align: 'start',
            sortable: false,
            key: 'id',
          },
          { title: 'Nombre', key: 'nombrebd' },
          { title: 'Apellidos', key: 'apellidobd' },
          { title: 'Telefono', key: 'telefonobd' },
          { title: 'Correo Electronico', key: 'correobd' },
          { title: 'Actions', key: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          id: '',
          nombrebd: 0,
          apellidobd: 0,
          telefonobd: 0,
          correobd: 0,
        },
        defaultItem: {
          id: '',
          nombrebd: 0,
          apellidobd: 0,
          telefonobd: 0,
          correobd: 0,
        },
      }),
  
      computed: {
        formTitle() {
          return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
        },
      },
  
      watch: {
        dialog(val) {
          val || this.close()
        },
        dialogDelete(val) {
          val || this.closeDelete()
        },
      },
  
      created() {
        this.initialize()
        this.listarUsuarios()
      },
  
      methods: {
        async listarUsuarios(){
          const q = query(collection(db,"usuarios"));
          const resul = await getDocs(q);
          resul.forEach((doc)=>{
            console.log("datos",doc.data());
            this.desserts.push(doc.data())
          })
        },
        initialize() {
          this.desserts = [
            {
              id: 1,
              nombrebd: 'Kevin',
              apellidobd: 'Ardila',
              telefonobd: 3213246555,
              correobd: 'kevinard04@gmail.com',
            },
            {
              id: 2,
              nombrebd: 'Juan',
              apellidobd: 'Bernal',
              telefonobd: 31281146555,
              correobd: 'JuanBa3r@gmail.com',
            },
            {
              id: 3,
              nombrebd: 'Andres',
              apellidobd: 'Peralta',
              telefonobd: 3153246415,
              correobd: 'AndresP@gmail.com',
            },
            {
              id: 4,
              nombrebd: 'Pedro',
              apellidobd: 'Sanchez',
              telefonobd: 3503246555,
              correobd: 'PedroP@gmail.com',
            },
            {
              id: 5,
              nombrebd: 'Armando',
              apellidobd: 'Lopez',
              telefonobd: 3033246555,
              correobd: 'ArmandoLpz@gmail.com',
            },
            {
              id: 6,
              nombrebd: 'Monica',
              apellidobd: 'Perez',
              telefonobd: 3113246555,
              correobd: 'Monicaprz@gmail.com',
            },
            {
              id: 7,
              nombrebd: 'Marcelo',
              apellidobd: 'Tinelli',
              telefonobd: 3223246555,
              correobd: 'MarcTinell@gmail.com',
            },
            {
              id: 8,
              nombrebd: 'Dayro',
              apellidobd: 'Moreno',
              telefonobd: 3213246555,
              correobd: 'Guarosk@gmail.com',
            },
            {
              id: 9,
              nombrebd: 'Mario',
              apellidobd: 'Hernandez',
              telefonobd: 3243246555,
              correobd: 'MarioH@gmail.com',
            },
            {
              id: 10,
              nombrebd: 'John',
              apellidobd: 'Perez',
              telefonobd: 3283246555,
              correobd: 'JohnPrz@gmail.com',
            },
          ]
        },
  
        editItem(item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem(item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm() {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close() {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete() {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save() {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>
  