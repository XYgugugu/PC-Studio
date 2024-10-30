# DataBase Design

* ### UML Diagram
    ![image](./PC%20Studio%20UML.png)
* ### Assumptions
    ##### Entity
    - **User**
        Contains the unique username and pc id of the user and the user’s plan of computer building, this is top level user information so must be an entity.
    - **PC**
        This entity is where we have all the PC planning information stored. It contains the id of this PC plan and the name of each of the 7 components of the computer picked for this PC building, it’s a unique table of combination of the 7 components, so it’s an entity.
    - **Components(Motherboard, CPU, CPU Cooler, GPU, Storage, Memory, Power Supply)**
        Each of these entities is a major individual component of a PC, and can be independently purchased when building a computer. 
		CPU: the central processing unit, is like the heart of a pc, executes instructions of computer programs. It’s an individual component of a computer, users can change and purchase CPUs as long as compatible, and does not belong to any other major part of the computer,  so it’s an entity rather than an attribute.
		CPU Cooler: responsible for maintaining a stable and not overheated temperature for the CPU, in order to increase computer’s usage time. Although the cooler always works with CPU, it’s not an accessory of the CPU and can be changed and purchased independently, so it’s an entity and not CPU’s attribute.
		Motherboard: holds and allows communication between electronic components of a computer. It’s an individual component and can be changed and purchased independently, so it’s an entity rather than an attribute.
		Storage: the electronic component of a computer that stores data for long term usage. It’s an individual component and can be changed and purchased independently, so it’s an entity rather than an attribute.
		Memory: including ROM and RAM, and usually people purchase RAM, store data and information of the computer that is used immediately for execution. It’s not a part of the storage and can be changed and purchased independently, so it’s an entity rather than an attribute.
		GPU: graphics processing unit, usually called graphic cards, is the unit responsible for displaying graphics and process images, it’s not a part of the CPU and is implemented and purchased independently(and in fact the most expensive piece of the computer in most cases) so it’s an entity and not an attribute.
		Power Supply: the component of the computer responsible for providing stable power for the machine. It’s also an important and independent component people purchase when building a computer, so it’s an entity and not an attribute.


    ##### Relation
    - **Design(User,PC)**
        This is the relationship between users and their plans for building PCs. The users are allowed to create their designs for PC and add their desired components. 
    - **Select(PC,Components)**
        This is the relationship of PC plan and the selected product of computer component in this particular plan. In each PC building plan, users can select different products of the seven major components of a PC (CPU, CPU Cooler, Motherboard, Storage, Memory, GPU, Power Supply)
    - **SupportCable(MotherBoard, PowerSupply)**
        This is the relationship between two components, representing that the two components are compatible with each other. The motherboard and power supply in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the design of cable of power supply has to be supported by the interface of CPU. 
	- **SlotSupport(MotherBoard, GPU)**
        This is the relationship between two components, representing that the two components are compatible with each other. The motherboard and GPU in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the slot on motherboard has to support the design of GPU. 
	- **ShareSameSocket(CPU, CPU Cooler)**
        This is the relationship between two components, representing that the two components are compatible with each other. The CPU and CPU Cooler in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the CPU and CPU Cooler must share the same type of socket for connection. 
    - **SupportSocket(MotherBoard, CPU)**
            This is the relationship between two components, representing that the two components are compatible with each other. The MotherBoard and CPU in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the MotherBoard’s socket must support the CPU’s socket type for connection. 
    - **TypeSlot(MotherBoard, Storage)**
            This is the relationship between two components, representing that the two components are compatible with each other. The MotherBoard and Storage in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the type of slot on MotherBoard must support the design used by Storage.  
    - **CanHandleRamSpeed(CPU, Memory)**
            This is the relationship between two components, representing that the two components are compatible with each other. The CPU and memory in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the CPU must be able to handle the Memory’s RAM speed to function properly. 
    - **TypeSupport(MotherBoard, Memory)**
            This is the relationship between two components, representing that the two components are compatible with each other. The MotherBoard and memory in a PC have to be compatible with each other in order for them to function correctly. By compatible it means that the MotherBoard must be able to support the Memory’s type in order to function correctly.
    ##### Relation Cardinality
    - **Design(User, PC)(1 - to - many)**
        A user can have mnay PC orders, but each PC only belongs to one user.
    - **Select(PC, Components)(many - to - 1)**
        Each PC must have one item of each kind in order to function, while a same popular product can be selected by multiple PCs or an outdated product not being chosen by anyone. 
    - **Other Relations(many - to - many)**
        For commercial reasons, one product should be compatible with multiple kinds of other products, for example, motherboards like many Z690 series can support not just Intel 12th Gen, but also 13th, etc. As a result, their relations are all many - to - many
    





* ### Normalized database
    **Entity Set**
    ```
    User(User_Name, PC_ID)

    PC(PC_ID, CPU_Name, Cooler_Name, MotherBoard_Name, Storage_Name, Memory_Name, GPU_Name, PowerSupply_Name, Estimated_Cost)

    MotherBoard(MotherBoard_Name, MotherBoard_Manufacturer, CPU Socket, Form Factor, Chipset, Memory Max, Memory Type, Memory Slots, Memory Speed, PCIe x16 Slots, PCIe x8 Slots, PCIe x4 Slots, PCIe x1 Slots, PCI Slots, M.2 Slots, Mini-PCIe Slots, Half Mini-PCIe Slots, Mini-PCIe / mSATA Slots, mSATA Slots, SATA 6.0 Gb/s, Onboard Ethernet, Onboard Video, USB 2.0 Headers, USB 2.0 Headers (Single Port), USB 3.2 Gen 1 Headers, USB 3.2 Gen 2 Headers, USB 3.2 Gen 2x2 Headers, Supports ECC, Wireless Networking, RAID Support, Uses Back-Connect Connectors, MotherBoard_Price)

    CPU(CPU_Name, CPU_Manufacturer, Series, Microarchitecture, Core Family, CPU Socket, Core Count, Thread Count, Performance Core ClockPerformance Core Boost Clock, L2 Cache, L3 Cache, TDP, Integrated Graphics, Maximum Supported Memory, ECC Support, Includes CPU Cooler, Lithography, Simultaneous Multithreading, CPU_Price)

    CPU Cooler(Cooler_Name, Cooler_Manufacturer, Model, Fan RPM, Noise Level, Height, CPU Socket, Water Cooled, Fanless, Cooler_Price)

    Storage(Storage_Name, Storage_Manufacturer, Storage_Price, Capacity, Type, Form Factor, Interface, NVME, Storage_Price)

    Memory(Memory_Name, Memory_Manufacturer, Memory_Price, Speed, Form Factor, Modules, First Word Latency, CAS Latency, Voltage, Timing, ECC, Heat Spreader, Memory_Price)

    GPU(GPU_Name, GPU_Manufacturer, GPU_Price, Chipset, Memory, Memory Type, Core Clock, Boost Clock, Interface, Frame Sync, Length, TDP, Case Expansion Slot Width, Total Slot Width, Cooling, External Power, HDMI 2.1a Outputs, DisplayPort 1.4a Outputs, GPU_Price)

    PowerSupply(PowerSupply_Name, PowerSupply_Manufacturer, PowerSupply_Price, Model, Type, Efficiency Rating, Wattage, Length, Modular, Fanless, ATX 4-Pin Connectors, EPS 8-Pin Connectors, PCIe 12+4-Pin 12VHPWR Connectors, PCIe 12-Pin Connectors, PCIe 8-Pin Connectors, PCIe 6+2-Pin Connectors, PCIe 6-Pin Connectors, SATA Connectors, Molex 4-Pin Connectors, PowerSupply_Price)
    ```
    **Functional Dependencies**
    
    For each of the 7 components, all specifications are independent from each other and can be inferred by only knowing the product name.

    Similarly, although there are several compatibility requirement between components, knowing one component only reduces the degree of availability of others.

    Therefore, the dependencies can be discovered:

    ```
    User_Name -> PC_ID

    PC_ID -> CPU_Name
    PC_ID -> Cooler_Name
    PC_ID -> MotherBoard_Name
    PC_ID -> Storage_Name
    PC_ID -> Memory_Name
    PC_ID -> GPU_Name
    PC_ID -> PowerSupply_Name
    PC_ID -> Estimated_Cost

    MotherBoard_Name -> MotherBoard_Manufacturer
    MotherBoard_Name -> CPU Socket
    MotherBoard_Name -> Form Factor
    MotherBoard_Name -> Chipset
    MotherBoard_Name -> Memory Max
    MotherBoard_Name -> Memory Type
    MotherBoard_Name -> Memory Slots
    MotherBoard_Name -> Memory Speed
    MotherBoard_Name -> PCIe x16 Slots
    MotherBoard_Name -> PCIe x8 Slots
    MotherBoard_Name -> PCIe x4 Slots
    MotherBoard_Name -> PCIe x1 Slots
    MotherBoard_Name -> PCI Slots
    MotherBoard_Name -> M.2 Slots
    MotherBoard_Name -> Mini-PCIe Slots
    MotherBoard_Name -> Half Mini-PCIe Slots
    MotherBoard_Name -> Mini-PCIe / mSATA Slots
    MotherBoard_Name -> mSATA Slots
    MotherBoard_Name -> SATA 6.0 Gb/s
    MotherBoard_Name -> Onboard Ethernet
    MotherBoard_Name -> Onboard Video
    MotherBoard_Name -> USB 2.0 Headers
    MotherBoard_Name -> USB 2.0 Headers (Single Port)
    MotherBoard_Name -> USB 3.2 Gen 1 Headers
    MotherBoard_Name -> USB 3.2 Gen 2 Headers
    MotherBoard_Name -> USB 3.2 Gen 2x2 Headers
    MotherBoard_Name -> Supports ECC
    MotherBoard_Name -> Wireless Networking
    MotherBoard_Name -> RAID Support
    MotherBoard_Name -> Uses Back-Connect Connectors
    MotherBoard_Name -> MotherBoard_Price

    CPU_Name -> CPU_Manufacturer
    CPU_Name -> Series
    CPU_Name -> Microarchitecture
    CPU_Name -> Core Family
    CPU_Name -> CPU Socket
    CPU_Name -> Core Count
    CPU_Name -> Thread Count
    CPU_Name -> Performance Core ClockPerformance Core Boost Clock
    CPU_Name -> L2 Cache
    CPU_Name -> L3 Cache
    CPU_Name -> TDP
    CPU_Name -> Integrated Graphics
    CPU_Name -> Maximum Supported Memory
    CPU_Name -> ECC Support
    CPU_Name -> Includes CPU Cooler
    CPU_Name -> Lithography
    CPU_Name -> Simultaneous Multithreading
    CPU_Name -> CPU_Price

    Cooler_Name -> Cooler_Manufacturer
    Cooler_Name -> Model
    Cooler_Name -> Fan RPM
    Cooler_Name -> Noise Level
    Cooler_Name -> Height
    Cooler_Name -> CPU Socket
    Cooler_Name -> Water Cooled
    Cooler_Name -> Fanless
    Cooler_Name -> Cooler_Price

    Storage_Name -> Storage_Manufacturer
    Storage_Name -> Storage_Price
    Storage_Name -> Capacity
    Storage_Name -> Type
    Storage_Name -> Form Factor
    Storage_Name -> Interface
    Storage_Name -> NVME
    Storage_Name -> Storage_Price

    Memory_Name -> Memory_Manufacturer
    Memory_Name -> Memory_Price
    Memory_Name -> Speed
    Memory_Name -> Form Factor
    Memory_Name -> Modules
    Memory_Name -> First Word Latency
    Memory_Name -> CAS Latency
    Memory_Name -> Voltage
    Memory_Name -> Timing
    Memory_Name -> ECC
    Memory_Name -> Heat Spreader
    Memory_Name -> Memory_Price

    GPU_Name -> GPU_Manufacturer
    GPU_Name -> GPU_Price
    GPU_Name -> Chipset
    GPU_Name -> Memory
    GPU_Name -> Memory Type
    GPU_Name -> Core Clock
    GPU_Name -> Boost Clock
    GPU_Name -> Interface
    GPU_Name -> Frame Sync
    GPU_Name -> Length
    GPU_Name -> TDP
    GPU_Name -> Case Expansion Slot Width
    GPU_Name -> Total Slot Width
    GPU_Name -> Cooling
    GPU_Name -> External Power
    GPU_Name -> HDMI 2.1a Outputs
    GPU_Name -> DisplayPort 1.4a Outputs
    GPU_Name -> GPU_Price

    PowerSupply_Name -> PowerSupply_Manufacturer
    PowerSupply_Name -> PowerSupply_Price
    PowerSupply_Name -> Model
    PowerSupply_Name -> Type
    PowerSupply_Name -> Efficiency Rating
    PowerSupply_Name -> Wattage
    PowerSupply_Name -> Length
    PowerSupply_Name -> Modular
    PowerSupply_Name -> Fanless
    PowerSupply_Name -> ATX 4-Pin Connectors
    PowerSupply_Name -> EPS 8-Pin Connectors
    PowerSupply_Name -> PCIe 12+4-Pin 12VHPWR Connectors
    PowerSupply_Name -> PCIe 12-Pin Connectors
    PowerSupply_Name -> PCIe 8-Pin Connectors
    PowerSupply_Name -> PCIe 6+2-Pin Connectors
    PowerSupply_Name -> PCIe 6-Pin Connectors
    PowerSupply_Name -> SATA Connectors
    PowerSupply_Name -> Molex 4-Pin Connectors
    PowerSupply_Name -> PowerSupply_Price
    ```

    **BCNF/3NF**
    Based on the dependencies shown above, all LHS are superkey, no partial or transitive dependency, all tables are already normalize, satisfying both BCNF and 3NF, that is:
    ```
    User(User_Name, PC_ID)

    PC(PC_ID, CPU_Name, Cooler_Name, MotherBoard_Name, Storage_Name, Memory_Name, GPU_Name, PowerSupply_Name, Estimated_Cost)

    MotherBoard(MotherBoard_Name, MotherBoard_Manufacturer, CPU Socket, Form Factor, Chipset, Memory Max, Memory Type, Memory Slots, Memory Speed, PCIe x16 Slots, PCIe x8 Slots, PCIe x4 Slots, PCIe x1 Slots, PCI Slots, M.2 Slots, Mini-PCIe Slots, Half Mini-PCIe Slots, Mini-PCIe / mSATA Slots, mSATA Slots, SATA 6.0 Gb/s, Onboard Ethernet, Onboard Video, USB 2.0 Headers, USB 2.0 Headers (Single Port), USB 3.2 Gen 1 Headers, USB 3.2 Gen 2 Headers, USB 3.2 Gen 2x2 Headers, Supports ECC, Wireless Networking, RAID Support, Uses Back-Connect Connectors, MotherBoard_Price)

    CPU(CPU_Name, CPU_Manufacturer, Series, Microarchitecture, Core Family, CPU Socket, Core Count, Thread Count, Performance Core ClockPerformance Core Boost Clock, L2 Cache, L3 Cache, TDP, Integrated Graphics, Maximum Supported Memory, ECC Support, Includes CPU Cooler, Lithography, Simultaneous Multithreading, CPU_Price)

    CPU Cooler(Cooler_Name, Cooler_Manufacturer, Model, Fan RPM, Noise Level, Height, CPU Socket, Water Cooled, Fanless, Cooler_Price)

    Storage(Storage_Name, Storage_Manufacturer, Storage_Price, Capacity, Type, Form Factor, Interface, NVME, Storage_Price)

    Memory(Memory_Name, Memory_Manufacturer, Memory_Price, Speed, Form Factor, Modules, First Word Latency, CAS Latency, Voltage, Timing, ECC, Heat Spreader, Memory_Price)

    GPU(GPU_Name, GPU_Manufacturer, GPU_Price, Chipset, Memory, Memory Type, Core Clock, Boost Clock, Interface, Frame Sync, Length, TDP, Case Expansion Slot Width, Total Slot Width, Cooling, External Power, HDMI 2.1a Outputs, DisplayPort 1.4a Outputs, GPU_Price)

    PowerSupply(PowerSupply_Name, PowerSupply_Manufacturer, PowerSupply_Price, Model, Type, Efficiency Rating, Wattage, Length, Modular, Fanless, ATX 4-Pin Connectors, EPS 8-Pin Connectors, PCIe 12+4-Pin 12VHPWR Connectors, PCIe 12-Pin Connectors, PCIe 8-Pin Connectors, PCIe 6+2-Pin Connectors, PCIe 6-Pin Connectors, SATA Connectors, Molex 4-Pin Connectors, PowerSupply_Price)
    ```


* ### Relational Schema
    **User**
    ```
    User(User_Name: VARCHAR(255) [PK], 
         PC_ID: INT [FK to PC.PC_ID])
    ```
    **PC**
    ```
    PC(PC_ID: INT [PK], 
       CPU_Name: VARCHAR(255) [FK to CPU.CPU_Name], 
       Cooler_Name: VARCHAR(255) [FK to CPU_Cooler.Cooler_Name], 
       MotherBoard_Name: VARCHAR(255) [FK to MotherBoard.MotherBoard_Name], 
       Storage_Name: VARCHAR(255) [FK to Storage.Storage_Name], 
       Memory_Name: VARCHAR(255) [FK to Memory.Memory_Name], 
       GPU_Name: VARCHAR(255) [FK to GPU.GPU_Name], 
       PowerSupply_Name: VARCHAR(255) [FK to PowerSupply.PowerSupply_Name])
    ```
    **CPU**
    ```
    CPU(CPU_Name: VARCHAR(255) [PK], 
        CPU_Manufacturer: VARCHAR(255), 
        Series: VARCHAR(255), Microarchitecture: VARCHAR(255),
        Core Family: VARCHAR(255), 
        CPU Socket: VARCHAR(255), 
        Core Count: INT,Thread_Count: INT,
        Performance Core Clock: FLOAT
        Performance Core Boost Clock: FLOAT,
        L2 Cache: INT,
        L3 Cache: INT,
        TDP: INT,
        Integrated Graphics: BOOL,
        Maximum Supported Memory: INT,
        ECC Support: BOOL,
        Includes CPU Cooler: BOOL,
        Lithography: INT,
        Simultaneous Multithreading: BOOL,
        CPU_Price: FLOAT)
    ```
    **CPU_Cooler**
    ```
    CPU_Cooler( Cooler_Name: VARCHAR(255) [PK], 
                Cooler_Manufacturer: VARCHAR(255),
                Model: VARCHAR(255),
                Fan RPM: INT,
                Noise Level: VARCHAR(255),
                Height: FLOAT,
                CPU Socket: VARCHAR(255),
                Water Cooled: BOOL,
                Fanless: BOOL,
                Cooler_Price: FLOAT)

    ```
    
    **MotherBoard**
    ```
    MotherBoard(MotherBoard_Name: VARCHAR(255) [PK],
                MotherBoard_Manufacturer: VARCHAR(255),
                CPU Socket: VARCHAR(255),
                Form Factor: VARCHAR(255),
                Chipset: VARCHAR(255), 
                Memory Max: INT,
                Memory Type: VARCHAR(255),
                Memory Slots: INT,
                Memory Speed: VARCHAR(255),
                PCIe x16 Slots: INT,
                PCIe x8 Slots: INT,
                PCIe x4 Slots: INT,
                PCIe x1 Slots: INT,
                PCI Slots: INT,
                M.2 Slots: VARCHAR(255),
                Mini-PCIe Slots: INT,
                Half Mini-PCIe Slots: INT,
                Mini-PCIe / mSATA Slots: INT,
                mSATA Slots: INT,
                SATA 6.0 Gb/s: INT,
                Onboard Ethernet: VARCHAR(255),
                Onboard Video: VARCHAR(255),
                USB 2.0 Headers: INT,
                USB 2.0 Headers (Single Port): INT,
                USB 3.2 Gen 1 Headers: INT,
                USB 3.2 Gen 2 Headers: INT,
                USB 3.2 Gen 2x2 Headers: INT,
                Supports ECC: BOOL,
                Wireless Networking: VARCHAR(255),
                RAID Support: BOOL,
                Uses Back-Connect Connectors: BOOL,
                MotherBoard_Price: FLOAT)
    ```
    **Memory**
    ```
    Memory(Memory_Name: VARCHAR(255) [PK],
           Memory_Manufacturer: VARCHAR(255),
           Speed: VARCHAR(255),
           Form Factor: VARCHAR(255),
           Modules: VARCHAR(255),
           First Word Latency: INT,
           CAS Latency: INT,
           Voltage: INT,
           Timing: VARCHAR(255),
           ECC / Registered: VARCHAR(255),
           Heat Spreader: BOOL
           Memort_Price: FLOAT)
    ```


    **Storage**
    ```
    Storage(Storage_Name: VARCHAR(255)[PK],
            Storage_Manufacturer: VARCHAR(255),
            Capacity: VARCHAR(255),
            Type: VARCHAR(255),
            Form Factor: VARCHAR(255),
            Interface: VARCHAR(255),
            NVME: BOOL,
            Storage_Price: FLOAT)
    ```

    **GPU**
    ```
    GPU(GPU_Name: VARCHAR(255)[PK],
        GPU_Manufacturer: VARCHAR(255),
        Chipset: VARCHAR(255),
        Memory: INT,
        Memory Type: VARCHAR(255),
        Core Clock: INT,
        Boost Clock: INT,
        Interface: VARCHAR(255),
        Frame Sync: VARCHAR(255),
        Length: INT,
        TDP: INT,
        Case Expansion Slot Width: INT,
        Total Slot Width: INT,
        Cooling: VARCHAR(255),
        External Power: VARCHAR(255),
        HDMI 2.1a Outputs: INT,
        DisplayPort 1.4a Outputs: INT,
        GPU_Price: FLOAT)
    ```

    **PowerSupply**
    ```
    PowerSupply(PowerSupply_Name: VARCHAR(255)[PK],
                PowerSupply_Manufacturer: VARCHAR(255),
                Model: VARCHAR(255),
                Type: VARCHAR(255),
                Efficiency Rating: VARCHAR(255),
                Wattage: INT,
                Length: INT,
                Modular: VARCHAR(255),
                Fanless: BOOL,
                ATX 4-Pin Connectors: INT,
                EPS 8-Pin Connectors: INT,
                PCIe 12+4-Pin 12VHPWR Connectors: INT,
                PCIe 12-Pin Connectors: INT,
                PCIe 8-Pin Connectors: INT,
                PCIe 6+2-Pin Connectors: INT,
                PCIe 6-Pin Connectors: INT,
                SATA Connectors: INT,
                Molex 4-Pin Connectors: INT,
                PowerSupply_Price: FLOAT)
    ```


### DDL
**Create Table**
```
CREATE TABLE IF NOT EXISTS User (
    name VARCHAR(255) PRIMARY KEY
);
```
```
CREATE TABLE IF NOT EXISTS PC (
    PC_ID INT,
    owner VARCHAR(255) NOT NULL,
    CPU_Name VARCHAR(255),
    Cooler_Name VARCHAR(255),
    Motherboard_Name VARCHAR(255),
    Storage_Name VARCHAR(255),
    Memory_Name VARCHAR(255),
    GPU_Name VARCHAR(255),
    PowerSupply_Name VARCHAR(255),
    Estimated_Cost DECIMAL(10, 2),
    PRIMARY KEY (PC_ID, owner),
    FOREIGN KEY (owner) REFERENCES User(name)
);
```
```
CREATE TABLE IF NOT EXISTS CPU (
    CPU_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Series VARCHAR(255),
    Microarchitecture VARCHAR(255),
    Core_Family VARCHAR(255),
    CPU_Socket VARCHAR(255),
    Core_Count INT,
    Thread_Count INT,
    Performance_Core_Clock VARCHAR(255),
    Performance_Core_Boost_Clock VARCHAR(255),
    L2_Cache VARCHAR(255),
    L3_Cache VARCHAR(255),
    TDP INT,
    Integrated_Graphics VARCHAR(255),
    Maximum_Supported_Memory VARCHAR(255),
    ECC_Support VARCHAR(255),
    Includes_Cooler VARCHAR(255),
    Includes_CPU_Cooler VARCHAR(255),
    Lithography VARCHAR(255),
    Simultaneous_Multithreading VARCHAR(255),
    PRIMARY KEY (CPU_Name)
);
```
```
CREATE TABLE IF NOT EXISTS CPU_Cooler (
    Cooler_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Model VARCHAR(255),
    Fan_RPM VARCHAR(255),
    Noise_Level VARCHAR(255),
    Height INT,
    Water_Cooled BOOL,
    Fanless BOOL,
    PRIMARY KEY (Cooler_Name)
);
```
```
CREATE TABLE IF NOT EXISTS GPU (
    GPU_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Chipset VARCHAR(255),
    Memory INT,
    Memory_Type VARCHAR(255),
    Core_Clock INT,
    Boost_Clock INT,
    Interface VARCHAR(255),
    Frame_Sync VARCHAR(255),
    Length INT,
    TDP INT,
    Case_Expansion_Slot_Width INT,
    Total_Slot_Width INT,
    Cooling VARCHAR(255),
    External_Power VARCHAR(255),
    HDMI_21_Outputs INT,
    DisplayPort_14_Outputs INT,
    PRIMARY KEY (GPU_Name)
);
```
```
CREATE TABLE IF NOT EXISTS RAM (
    Memory_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Speed VARCHAR(255),
    Form_Factor VARCHAR(255),
    Modules VARCHAR(255),
    First_Word_Latency DECIMAL(10, 5),
    CAS_Latency DECIMAL(10, 5),
    Voltage DECIMAL(10, 5),
    Timing VARCHAR(255),
    ECC_Registered VARCHAR(255),
    Heat_Spreader BOOL,
    PRIMARY KEY (Memory_Name)
);
```
```
CREATE TABLE IF NOT EXISTS Motherboard (
    Motherboard_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Socket VARCHAR(255),
    Form_Factor VARCHAR(255),
    Chipset VARCHAR(255),
    Memory_Max INT,
    Memory_Type VARCHAR(255),
    Memory_Slots VARCHAR(255),
    Memory_Speed VARCHAR(255),
    PCIe_x16_Slots INT,
    PCIe_x8_Slots INT,
    PCIe_x4_Slots INT,
    PCIe_x1_Slots INT,
    PCI Slots INT,
    M2_Slots INT,
    Mini_PCIe_mSATA_Slots INT,
    Half_Mini_PCIe_Slots INT,
    Mini_PCIe_Slots INT,
    mSATA_Slots INT,
    SATA6_Gbs INT,
    Onboard_Ethernet VARCHAR(255),
    Onboard_Video VARCHAR(255),
    USB_2_0_Headers INT,
    USB_2_0_Headers_Single_Port INT,
    USB_3_2_Gen_1_Headers INT,
    USB_3_2_Gen_2_Headers INT,
    USB_3_2_Gen_2x2_Headers INT,
    Supports_ECC BOOL,
    Wireless_Networking VARCHAR(255),
    RAID_Support BOOL,
    Uses_Back_Connect_Connectors BOOL,
    PRIMARY KEY (Motherboard_Name)
);
```
```
CREATE TABLE IF NOT EXISTS PowerSupply (
    PowerSupply_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Model VARCHAR(255),
    Type VARCHAR(255),
    Efficiency_Rating VARCHAR(255),
    Wattage INT,
    Length INT,
    Modular VARCHAR(255),
    Fanless BOOL,
    ATX_4_Pin_Connectors INT,
    EPS_8_Pin_Connectors INT,
    PCIe_12_4_Pin_12VHPWR_Connectors INT,
    PCIe_12_Pin_Connectors INT,
    PCIe_8_Pin_Connectors INT,
    PCIe_6_2_Pin_Connectors INT,
    PCIe_6_Pin_Connectors INT,
    SATA_Connectors INT,
    Molex_4_Pin_Connectors INT,
    PRIMARY KEY (PowerSupply_Name)
);
```
```
CREATE TABLE IF NOT EXISTS Storage (
    Storage_Name VARCHAR(255),
    Manufacturer VARCHAR(255),
    Capacity DECIMAL(10, 4),
    Type VARCHAR(255),
    Form_Factor VARCHAR(255),
    Interface VARCHAR(255),
    NVME BOOL,
    PRIMARY KEY (Storage_Name)
);
```
**Connection and row counts**
![](./imgs/sql_connection.png)
![](./imgs/table_count.png)

**Advanced SQL queries**
##### Prompt 1:
The user wants to know more about storages that provides NVME compatibility, so the user wants to know the number of storage products of each manufacturer that supports NVME, while also have a capacity greater than or equal to the average capacity of that manufacturer.
##### Query 1:
```
SELECT Storage.Manufacturer, COUNT(Storage.Storage_Name) AS Storage_Count
FROM Storage
WHERE Storage.NVME = TRUE
  AND Storage.Capacity >= (
      SELECT AVG(Capacity)
      FROM Storage AS S2
      WHERE S2.Manufacturer = Storage.Manufacturer
  )
GROUP BY Storage.Manufacturer
LIMIT 15;
```
![](./imgs/advanceSQL1.png)
##### Prompt 2:
The user wants to know all the CPUs compatible with ASRock’s motherboards, as well as all the CPUs that have >= 4 cores and >= 4 threads
##### Query 2:
```
SELECT CPU.CPU_Name
FROM CPU
JOIN (
       SELECT * FROM Motherboard
       WHERE Manufacturer = 'ASRock'
) AS M
ON CPU.CPU_Socket = M.Socket

UNION

SELECT CPU.CPU_Name
FROM CPU
WHERE Core_Count >= 4 AND Thread_Count >= 4;
```
![](./imgs/advanceSQL2.png)
##### Prompt 3:
The user want to know the CPUs with their compatible motherboards, Which should have high-performance with above-average TDP and work with multiple motherboards
##### Query 3:
```
SELECT DISTINCT CPU.CPU_Name, CPU.Manufacturer, CPU.TDP, Motherboard.Motherboard_Name, Motherboard.Manufacturer
FROM PC_Studio.CPU
JOIN PC_Studio.Motherboard ON CPU.CPU_Socket = Motherboard.Socket
WHERE CPU.TDP > (SELECT AVG(TDP) FROM PC_Studio.CPU) and 
	CPU.CPU_Name in (SELECT CPU.CPU_Name
					 FROM PC_Studio.CPU
					 JOIN PC_Studio.Motherboard ON CPU.CPU_Socket = Motherboard.Socket
					 GROUP BY CPU.CPU_Name
                     HAVING COUNT(Motherboard.Motherboard_Name) > 1)
ORDER BY CPU.TDP DESC
LIMIT 15;
```
![](./imgs/advanceSQL3.png)
##### Prompt 4:
The user want to know CPUs and GPUs with TDP values above their respective averages and combines the results.
##### Query 4:
```
SELECT 'CPU' AS Component, CPU.CPU_Name AS Component_Name, CPU.Manufacturer AS Manufacturer, CPU.TDP AS TDP
FROM PC_Studio.CPU
WHERE CPU.TDP > (SELECT AVG(TDP) FROM PC_Studio.CPU)

UNION

SELECT 'GPU' AS Component, GPU.GPU_Name AS Component_Name, GPU.Manufacturer AS Manufacturer, GPU.TDP AS TDP
FROM PC_Studio.GPU
WHERE GPU.TDP > (SELECT AVG(TDP) FROM PC_Studio.GPU)

ORDER BY TDP DESC
LIMIT 15;
```
![](./imgs/advanceSQL4.png)