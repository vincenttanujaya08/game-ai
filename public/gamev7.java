import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.util.*;
import java.util.List;

/**
 * BROKEN CAMERA — evolving AI case-note edition.
 *
 * Single-file Java Swing game. No external libraries required.
 * Put this file under src/ as gamev7.java and run gamev7.main().
 */
public class gamev7 extends JFrame {

    private static final String GAME_VERSION = "V7.0 • TIMED EVIDENCE PATHS";

    // ---------- Theme ----------
    private static final Color BG = new Color(18, 20, 24);
    private static final Color PANEL = new Color(28, 31, 37);
    private static final Color PANEL_2 = new Color(36, 40, 47);
    private static final Color TEXT = new Color(238, 240, 244);
    private static final Color MUTED = new Color(170, 176, 186);
    private static final Color ACCENT = new Color(120, 170, 255);
    private static final Color SUCCESS = new Color(112, 205, 144);
    private static final Color WARNING = new Color(255, 197, 94);
    private static final Color DANGER = new Color(255, 125, 125);

    private final CardLayout rootLayout = new CardLayout();
    private final JPanel root = new JPanel(rootLayout);

    // ---------- Game State ----------
    private final LinkedHashMap<String, CharacterData> characters = new LinkedHashMap<>();
    private final Set<String> interviewed = new LinkedHashSet<>();
    private final Set<String> askedMore = new LinkedHashSet<>();
    private final Set<Integer> unlockedEvidence = new LinkedHashSet<>();

    private static final int INVESTIGATION_SECONDS = 10 * 60;
    private static final int MIN_INTERVIEWS_FOR_EARLY_FINAL = 5;
    private int askMoreRemaining = 3;
    private int secondsRemaining = INVESTIGATION_SECONDS;
    private boolean investigationStarted = false;
    private boolean investigationClosed = false;
    private final javax.swing.Timer investigationTimer = new javax.swing.Timer(1000, e -> onTimerTick());
    private String selectedCharacter = "Arya";
    private boolean originalTabViewed = false;
    private boolean gameFinished = false;
    private final List<NoteRevision> noteHistory = new ArrayList<>();
    private String lastRecordedSynthesis = "";

    // ---------- Investigation UI ----------
    private final JLabel interviewCountLabel = new JLabel();
    private final JLabel askMoreCountLabel = new JLabel();
    private final JLabel timerLabel = new JLabel();
    private final JLabel selectedNameLabel = new JLabel();
    private final JLabel selectedRoleLabel = new JLabel();
    private final JTextArea dialogueArea = createTextArea();
    private final JButton hearStatementButton = new JButton("DENGARKAN STATEMENT");
    private final JButton askMoreButton = new JButton("ASK MORE");
    private final JLabel statusLine = new JLabel(" ");
    private final JPanel peopleListPanel = new JPanel();
    private final JPanel evidenceListPanel = new JPanel();
    private final JTextArea synthesisNotebookArea = createTextArea();
    private final JTextArea sourcesNotebookArea = createTextArea();
    private final JTextArea revisionNotebookArea = createTextArea();
    private final JTabbedPane notebookTabs = new JTabbedPane();

    private static final Set<String> PHASE_ONE = Set.of("Arya", "Kevin", "Bella", "Fajar", "Siska");
    private static final Set<String> PHASE_TWO = Set.of("Dimas", "Rafi", "Chris");
    private static final Set<String> PHASE_THREE = Set.of("Nina", "Leo", "Maya");
    private final JButton reconstructButton = new JButton("END INVESTIGATION →");

    // ---------- Final Questions ----------
    private final ButtonGroup q1Group = new ButtonGroup();
    private final ButtonGroup q2Group = new ButtonGroup();
    private final ButtonGroup q3Group = new ButtonGroup();
    private final ButtonGroup q4Group = new ButtonGroup();
    private final ButtonGroup q5Group = new ButtonGroup();
    private final Map<ButtonGroup, String> selectedAnswers = new HashMap<>();

    // ---------- Final AI Summary Decision ----------
    private final CardLayout finalFlowLayout = new CardLayout();
    private final JPanel finalFlowPanel = new JPanel(finalFlowLayout);
    private String finalDecisionMode = null; // USE or CHANGE
    private String changedConclusion = null;
    private final ButtonGroup changeConclusionGroup = new ButtonGroup();
    private final ButtonGroup useEvidenceGroup = new ButtonGroup();
    private final ButtonGroup useWeaknessGroup = new ButtonGroup();
    private final ButtonGroup changeEvidenceGroup = new ButtonGroup();
    private final ButtonGroup changeReasonGroup = new ButtonGroup();
    private final Map<ButtonGroup, String> finalBranchAnswers = new HashMap<>();
    private FinalSummary finalSummarySnapshot = null;
    private final JPanel changeReasoningContainer = new JPanel(new BorderLayout());

    public gamev7() {
        super("Broken Camera — " + GAME_VERSION);
        setupData();
        setupFrame();
        buildScreens();
        refreshAll();
    }

    private void setupFrame() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Dimension screen = Toolkit.getDefaultToolkit().getScreenSize();
        int width = Math.min(1440, Math.max(1180, screen.width - 40));
        int height = Math.min(900, Math.max(700, screen.height - 60));
        setMinimumSize(new Dimension(1180, 700));
        setSize(width, height);
        setLocationRelativeTo(null);
        setContentPane(root);
        getContentPane().setBackground(BG);
    }

    private void buildScreens() {
        root.add(buildStartScreen(), "START");
        root.add(buildInvestigationScreen(), "INVESTIGATION");
        root.add(buildFinalScreen(), "FINAL");
        root.add(buildRevealScreen(), "REVEAL");
    }

    // ============================================================
    // DATA
    // ============================================================

    private void setupData() {
        characters.clear();

        characters.put("Arya", new CharacterData(
                "ARYA",
                "Dokumentasi • pengguna kamera terakhir yang tercatat",
                "Return sheet menempatkan Arya sebagai titik awal paling logis. Kita belum menganggap dia bersalah; kita perlu tahu apa yang terjadi pada kamera sebelum dan sesudah ia menandatangani return.",
                """
                        “Aku selesai ambil foto sekitar 17:45. Jam 17:48 aku tanda tangan return sheet karena kupikir urusanku sama kamera sudah selesai.”

                        “Habis itu aku langsung pindah bantu kabel di dekat panggung. Seingatku nggak ada masalah besar waktu aku masih pegang kamera.”
                        """,
                "Sebelum tanda tangan return, ada benturan atau kejadian apa pun waktu kamera masih kamu pegang?",
                """
                        “Ada satu momen strap-nya nyangkut pas aku turun dari panggung. Kameranya sempat mengayun dan kena railing pelan.”

                        “Aku lihat sekilas, kelihatannya normal. Karena nggak ada bunyi pecah, aku lanjut dan kemudian taruh kamera di meja dokumentasi.”
                        """));

        characters.put("Kevin", new CharacterData(
                "KEVIN",
                "Stage crew • melihat Arya sebelum return",
                "Kevin berada dekat tangga panggung saat Arya masih membawa kamera. Ia relevan untuk mengecek apakah ada kejadian sebelum kamera mencapai meja dokumentasi.",
                """
                        “Aku lihat Arya turun dari panggung agak buru-buru sambil masih bawa kamera. Ada suara kecil kayak benda keras kena metal.”

                        “Aku nggak fokus ke kameranya, jadi awalnya kupikir cuma buckle strap atau railing yang kesenggol.”
                        """,
                "Kamu benar-benar melihat kamera menyentuh railing?",
                """
                        “Iya, setelah kuingat lagi body bagian depan kameranya memang mengayun ke railing. Bukan jatuh, tapi kontaknya jelas.”

                        “Arya sempat berhenti satu-dua detik dan lihat kamera sebelum jalan lagi. Aku nggak bisa lihat kondisi lensanya dari tempatku.”
                        """));

        characters.put("Bella", new CharacterData(
                "BELLA",
                "Panitia • mengambil camera bag dari meja dokumentasi",
                "Bella berinteraksi langsung dengan area kamera beberapa menit setelah Arya. Kita perlu membedakan apa yang terjadi pada camera bag dan pada kameranya sendiri.",
                """
                        “Aku ambil camera bag karena baterai dan charger harus dibawa ke charging station. Kameranya sendiri nggak aku masukkan ke tas.”

                        “Strap tas sempat ketindih barang di meja, jadi aku memang berhenti sebentar buat ngelepasnya sebelum pergi.”
                        """,
                "Waktu melepas strap tas, kamu menyentuh atau memindahkan kameranya?",
                """
                        “Iya. Kameranya nutup sebagian strap, jadi aku angkat sedikit buat narik strap keluar.”

                        “Pas kutaruh lagi, sisi kameranya sempat kena tepi meja. Nggak keras banget, dan aku nggak lihat ada kerusakan.”
                        """));

        characters.put("Fajar", new CharacterData(
                "FAJAR",
                "Stage crew • berada dekat Bella di meja dokumentasi",
                "Fajar melihat Bella saat mengambil camera bag. Keterangannya bisa menguji apakah interaksi Bella dengan meja hanya soal tas atau juga melibatkan kamera.",
                """
                        “Aku lewat pas Bella lagi narik strap camera bag dari meja. Aku lihat beberapa barang di meja ikut bergeser.”

                        “Ada bunyi ‘duk’ kecil, tapi dari posisiku aku nggak tahu benda mana yang kena meja.”
                        """,
                "Kamu sempat melihat apa yang menghasilkan bunyi itu?",
                """
                        “Pas aku menoleh lagi, Bella lagi pegang kamera dengan satu tangan dan tas dengan tangan lain. Kameranya baru saja nyentuh tepi meja.”

                        “Aku nggak bisa bilang benturannya cukup keras buat merusak lensa, tapi kontaknya memang terjadi.”
                        """));

        characters.put("Siska", new CharacterData(
                "SISKA",
                "Publikasi • memiliki foto cleanup timestamp 17:56",
                "Foto Siska memberi titik waktu independen. Ini penting untuk memisahkan klaim orang dari posisi kamera yang benar-benar terdokumentasi.",
                """
                        “Aku motret suasana cleanup buat story. Salah satu foto timestamp-nya 17:56 dan meja dokumentasi kelihatan di background.”

                        “Di foto itu kameranya masih ada di meja. Bella sudah lebih jauh sambil bawa camera bag.”
                        """,
                "Dari foto 17:56, kondisi lensanya bisa dinilai?",
                """
                        “Nggak. Kameranya cukup jelas buat tahu posisinya, tapi terlalu kecil dan sudutnya nggak pas buat lihat ada crack atau nggak.”

                        “Jadi foto itu membuktikan lokasi kamera, bukan kondisinya.”
                        """));

        characters.put("Dimas", new CharacterData(
                "DIMAS",
                "Cleanup team • membersihkan meja dokumentasi",
                "Setelah foto 17:56, meja harus dikosongkan. Dimas bertanggung jawab atas cleanup, jadi keterangannya penting untuk menjelaskan bagaimana kamera bisa masuk ke gray crate.",
                """
                        “Aku beresin meja dokumentasi sekitar jam enam kurang sedikit. Banyak barang kecil masih campur: adapter, kabel, clamp, sama equipment hitam.”

                        “Barang yang kelihatannya equipment aku kumpulin ke gray crate di sebelah meja supaya area cepat kosong.”
                        """,
                "Kamu memasukkan barang satu-satu atau sekaligus? Ada benturan saat masuk crate?",
                """
                        “Aku ambil beberapa barang sekaligus dan masukin ke crate tanpa cek satu-satu. Ada bunyi barang saling kena di dalam crate.”

                        “Kalau kamera masih ada di tumpukan itu, sangat mungkin ikut masuk. Aku baru sadar kemungkinan itu setelah kamera ditemukan besoknya.”
                        """));

        characters.put("Rafi", new CharacterData(
                "RAFI",
                "Floor crew • kembali ke meja sekitar 18:06",
                "Rafi melihat fase akhir cleanup. Ia dapat menghubungkan kamera yang masih ada pada 17:56 dengan crate yang sudah tertutup beberapa menit kemudian.",
                """
                        “Aku balik ke meja sekitar 18:06 cari marker. Mejanya sudah hampir kosong dan gray crate di sampingnya sudah tertutup.”

                        “Sebelumnya aku lihat Dimas mindahin satu tumpukan barang dari meja ke arah crate.”
                        """,
                "Apa kamu melihat kamera ada di tumpukan yang Dimas bawa?",
                """
                        “Aku lihat benda hitam dengan bentuk yang mirip body kamera di bawah kabel, tapi cuma beberapa detik.”

                        “Waktu tumpukan itu masuk crate aku dengar bunyi cukup berat. Aku nggak lihat kondisi benda hitam itu setelah masuk.”
                        """));

        characters.put("Chris", new CharacterData(
                "CHRIS",
                "Logistik • membawa gray crate ke multimedia room",
                "Setelah crate tertutup, Chris yang memindahkannya ke ruang multimedia. Ia relevan karena setiap kejadian selama transport bisa memengaruhi isi crate.",
                """
                        “Aku diminta bawa gray crate yang sudah ditutup ke multimedia room sekitar 18:10. Aku nggak tahu isi detailnya.”

                        “Aku bawa pakai dua tangan dan langsung lewat pintu samping karena jalur utama masih ramai.”
                        """,
                "Ada benturan saat kamu membawa crate?",
                """
                        “Iya. Sisi crate kena kusen pintu cukup keras sampai aku refleks berhenti.”

                        “Crate tetap tertutup. Aku nggak buka buat cek isi karena nggak tahu kameranya ada di dalam.”
                        """));

        characters.put("Nina", new CharacterData(
                "NINA",
                "Dekorasi • menyaksikan crate masuk lewat pintu",
                "Nina berada tepat di dekat pintu saat Chris membawa crate. Ia bisa menguji seberapa nyata dan seberapa kuat benturan yang disebut Chris.",
                """
                        “Aku lihat Chris lewat sambil bawa gray crate. Crate itu memang kena kusen dan bunyinya jelas.”

                        “Chris berhenti sebentar, lihat box-nya, terus lanjut ke dalam. Nggak ada yang buka crate saat itu.”
                        """,
                "Menurutmu benturannya ringan atau cukup kuat untuk menggeser isi crate?",
                """
                        “Cukup kuat sampai sisi crate memantul sedikit dari kusen. Aku juga dengar suara barang bergerak dari dalam.”

                        “Tapi aku nggak tahu isi crate, jadi aku nggak bisa lihat apa yang terjadi ke kameranya.”
                        """));

        characters.put("Leo", new CharacterData(
                "LEO",
                "Multimedia • merapikan tripod setelah crate tiba",
                "Setelah crate diletakkan, Leo masih merapikan tripod. Keterangannya penting karena ada kemungkinan kejadian lain setelah transport selesai.",
                """
                        “Aku lagi susun tripod di rak setelah gray crate masuk. Salah satu tripod nggak stabil karena raknya penuh.”

                        “Beberapa menit kemudian tripod itu jatuh ke arah area crate. Aku dengar benturan keras, tapi waktu itu aku membelakangi rak.”
                        """,
                "Dari posisi akhirnya, seberapa mungkin tripod benar-benar mengenai crate?",
                """
                        “Menurutku cukup mungkin. Salah satu kaki tripod berhenti menempel di sisi crate dan crate-nya kelihatan bergeser sedikit.”

                        “Aku tetap nggak melihat momen kontaknya langsung, jadi ini dari posisi setelah kejadian.”
                        """));

        characters.put("Maya", new CharacterData(
                "MAYA",
                "Multimedia helper • berada di ruangan saat tripod jatuh",
                "Maya memberi sudut kedua untuk kejadian tripod. Ia relevan untuk menguji apakah kejadian setelah transport cukup kuat menjadi alternatif penyebab kerusakan.",
                """
                        “Sekitar 18:20 aku dengar bunyi benturan dari rak tripod. Waktu lihat ke sana, tripod sudah jatuh di samping gray crate.”

                        “Leo langsung angkat tripodnya. Crate tetap tertutup dan nggak ada yang cek isinya.”
                        """,
                "Apa kamu melihat crate bergerak atau tripod menyentuhnya?",
                """
                        “Aku nggak lihat detik kontaknya, tapi pas aku menoleh crate kayak baru bergeser sedikit dan kaki tripod masih menyentuh sisinya.”

                        “Jadi menurutku tripod memang mengenai crate, walaupun aku nggak bisa bilang bagian mana yang kena.”
                        """));
    }

    // ============================================================
    // START SCREEN
    // ============================================================

    private JPanel buildStartScreen() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBackground(BG);
        panel.setBorder(new EmptyBorder(32, 32, 32, 32));

        JPanel card = cardPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setPreferredSize(new Dimension(860, 670));
        card.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(55, 61, 72), 1, true),
                new EmptyBorder(36, 48, 36, 48)));

        JLabel eyebrow = label("SCHOOL INCIDENT • CASE 02   |   " + GAME_VERSION, 13, Font.BOLD, MUTED);
        eyebrow.setAlignmentX(Component.LEFT_ALIGNMENT);
        JLabel title = label("THE CAMERA IS BROKEN.", 36, Font.BOLD, TEXT);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);

        JTextArea intro = createTextArea();
        intro.setText(
                """
                        Kemarin kamera sekolah dipakai untuk dokumentasi sebuah acara. Setelah acara selesai, equipment dibereskan dari area dokumentasi menuju ruang multimedia.

                        Pagi ini kamera ditemukan DI DALAM gray equipment crate di ruang multimedia. Lensanya retak. Tidak ada catatan yang menunjukkan kapan kamera masuk ke crate atau kapan kerusakan terjadi.

                        Tugasmu bukan mencari tersangka. Rekonstruksi alurnya: di mana kamera berada setelah terakhir dipakai, bagaimana kamera bisa berpindah ke crate, dan apa yang benar-benar bisa disimpulkan tentang kerusakannya.
                        """);
        intro.setFont(new Font("SansSerif", Font.PLAIN, 17));
        intro.setForeground(TEXT);
        intro.setMaximumSize(new Dimension(740, 230));
        intro.setAlignmentX(Component.LEFT_ALIGNMENT);

        JPanel noteBox = new JPanel(new BorderLayout(0, 7));
        noteBox.setBackground(new Color(30, 39, 52));
        noteBox.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(66, 96, 140), 1, true),
                new EmptyBorder(14, 16, 14, 16)));
        noteBox.setMaximumSize(new Dimension(Integer.MAX_VALUE, 165));
        noteBox.setAlignmentX(Component.LEFT_ALIGNMENT);
        noteBox.add(label("AI CASE NOTES", 12, Font.BOLD, ACCENT), BorderLayout.NORTH);
        JTextArea noteIntro = createTextArea();
        noteIntro.setText(
                "Setelah setiap interview, sistem otomatis menyatukan keterangan yang sudah kamu dengar menjadi satu working theory. "
                        +
                        "AI Note akan tetap memilih hipotesis yang menurutnya paling masuk akal dari konteks yang kamu kumpulkan, meskipun bukti langsung belum lengkap. "
                        +
                        "Kamu punya 10 menit. Tidak semua orang wajib diwawancarai, dan Ask More juga tidak wajib dihabiskan. "
                        +
                        "Siapa yang kamu pilih untuk digali akan mengubah konteks yang masuk ke synthesis, sehingga Final AI Summary bisa berbeda antar-player. "
                        +
                        "Original statements selalu tersedia di Case Notebook.");
        noteIntro.setFont(new Font("SansSerif", Font.PLAIN, 14));
        noteIntro.setForeground(TEXT);
        noteIntro.setBackground(new Color(30, 39, 52));
        noteBox.add(noteIntro, BorderLayout.CENTER);

        JLabel mission = label("RECONSTRUCT WHAT HAPPENED.", 18, Font.BOLD, ACCENT);
        mission.setAlignmentX(Component.LEFT_ALIGNMENT);

        JButton start = primaryButton("START INVESTIGATION");
        start.setAlignmentX(Component.LEFT_ALIGNMENT);
        start.addActionListener(e -> {
            startInvestigationClock();
            rootLayout.show(root, "INVESTIGATION");
        });

        card.add(eyebrow);
        card.add(Box.createVerticalStrut(12));
        card.add(title);
        card.add(Box.createVerticalStrut(22));
        card.add(intro);
        card.add(Box.createVerticalStrut(18));
        card.add(noteBox);
        card.add(Box.createVerticalGlue());
        card.add(mission);
        card.add(Box.createVerticalStrut(14));
        card.add(start);

        panel.add(card);
        return panel;
    }

    // ============================================================
    // INVESTIGATION SCREEN
    // ============================================================

    private JPanel buildInvestigationScreen() {
        JPanel page = new JPanel(new BorderLayout(14, 14));
        page.setBackground(BG);
        page.setBorder(new EmptyBorder(16, 16, 16, 16));
        page.add(buildTopBar(), BorderLayout.NORTH);

        JPanel people = buildPeoplePanel();
        JPanel interview = buildInterviewPanel();
        JPanel notebook = buildNotebookPanel();

        // Real minimum sizes prevent the people list and notebook from collapsing into
        // unreadable slivers.
        people.setMinimumSize(new Dimension(245, 400));
        interview.setMinimumSize(new Dimension(500, 400));
        notebook.setMinimumSize(new Dimension(350, 400));

        JSplitPane rightSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, interview, notebook);
        rightSplit.setResizeWeight(0.58);
        rightSplit.setDividerSize(8);
        rightSplit.setContinuousLayout(true);
        rightSplit.setBorder(null);
        rightSplit.setOpaque(false);
        rightSplit.setDividerLocation(610);

        JSplitPane mainSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, people, rightSplit);
        mainSplit.setResizeWeight(0.19);
        mainSplit.setDividerSize(8);
        mainSplit.setContinuousLayout(true);
        mainSplit.setBorder(null);
        mainSplit.setOpaque(false);
        mainSplit.setDividerLocation(255);

        page.add(mainSplit, BorderLayout.CENTER);
        page.add(buildBottomBar(), BorderLayout.SOUTH);

        // Apply divider positions again after Swing has a real size.
        SwingUtilities.invokeLater(() -> {
            if (mainSplit.getWidth() > 0)
                mainSplit.setDividerLocation(Math.max(245, (int) (mainSplit.getWidth() * 0.19)));
            if (rightSplit.getWidth() > 0)
                rightSplit.setDividerLocation(Math.max(500, (int) (rightSplit.getWidth() * 0.58)));
        });
        return page;
    }

    private JPanel buildTopBar() {
        JPanel bar = new JPanel(new BorderLayout());
        bar.setOpaque(false);

        JPanel titleBox = new JPanel();
        titleBox.setLayout(new BoxLayout(titleBox, BoxLayout.Y_AXIS));
        titleBox.setOpaque(false);
        titleBox.add(label("BROKEN CAMERA", 23, Font.BOLD, TEXT));
        titleBox.add(label(GAME_VERSION, 10, Font.BOLD, ACCENT));
        titleBox.add(label("Trace the camera path • Watch the AI working theory change", 13, Font.PLAIN, MUTED));

        JPanel stats = new JPanel(new FlowLayout(FlowLayout.RIGHT, 18, 0));
        stats.setOpaque(false);
        interviewCountLabel.setForeground(TEXT);
        interviewCountLabel.setFont(new Font("SansSerif", Font.BOLD, 14));
        askMoreCountLabel.setForeground(WARNING);
        askMoreCountLabel.setFont(new Font("SansSerif", Font.BOLD, 14));
        timerLabel.setForeground(SUCCESS);
        timerLabel.setFont(new Font("SansSerif", Font.BOLD, 15));
        stats.add(timerLabel);
        stats.add(interviewCountLabel);
        stats.add(askMoreCountLabel);

        bar.add(titleBox, BorderLayout.WEST);
        bar.add(stats, BorderLayout.EAST);
        return bar;
    }

    private JPanel buildPeoplePanel() {
        JPanel outer = cardPanel();
        outer.setLayout(new BorderLayout(0, 9));

        JPanel head = new JPanel();
        head.setOpaque(false);
        head.setLayout(new BoxLayout(head, BoxLayout.Y_AXIS));
        JLabel heading = label("PEOPLE TO INTERVIEW", 13, Font.BOLD, MUTED);
        heading.setAlignmentX(Component.LEFT_ALIGNMENT);
        JLabel hint = label("Unlocks as the camera path develops.", 10, Font.PLAIN, MUTED);
        hint.setAlignmentX(Component.LEFT_ALIGNMENT);
        head.add(heading);
        head.add(Box.createVerticalStrut(3));
        head.add(hint);
        outer.add(head, BorderLayout.NORTH);

        peopleListPanel.setLayout(new BoxLayout(peopleListPanel, BoxLayout.Y_AXIS));
        peopleListPanel.setOpaque(false);
        JScrollPane listScroll = transparentScroll(peopleListPanel);
        listScroll.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
        outer.add(listScroll, BorderLayout.CENTER);
        return outer;
    }

    private JPanel buildInterviewPanel() {
        JPanel outer = cardPanel();
        outer.setLayout(new BorderLayout(0, 12));

        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.Y_AXIS));
        header.setOpaque(false);
        selectedNameLabel.setFont(new Font("SansSerif", Font.BOLD, 28));
        selectedNameLabel.setForeground(TEXT);
        selectedNameLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        selectedRoleLabel.setFont(new Font("SansSerif", Font.PLAIN, 14));
        selectedRoleLabel.setForeground(MUTED);
        selectedRoleLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        header.add(selectedNameLabel);
        header.add(Box.createVerticalStrut(4));
        header.add(selectedRoleLabel);

        dialogueArea.setFont(new Font("SansSerif", Font.PLAIN, 17));
        dialogueArea.setForeground(TEXT);
        dialogueArea.setBackground(PANEL_2);
        dialogueArea.setOpaque(true);
        dialogueArea.setBorder(new EmptyBorder(22, 24, 22, 24));
        JScrollPane dialogueScroll = new JScrollPane(dialogueArea);
        dialogueScroll.setBorder(new LineBorder(new Color(55, 61, 72), 1, true));
        dialogueScroll.getViewport().setBackground(PANEL_2);
        dialogueScroll.getVerticalScrollBar().setUnitIncrement(16);
        dialogueScroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 0));
        actions.setOpaque(false);
        stylePrimary(hearStatementButton);
        styleSecondary(askMoreButton);
        hearStatementButton.addActionListener(this::onHearStatement);
        askMoreButton.addActionListener(this::onAskMore);
        actions.add(hearStatementButton);
        actions.add(askMoreButton);

        statusLine.setFont(new Font("SansSerif", Font.PLAIN, 13));
        statusLine.setForeground(SUCCESS);

        JPanel south = new JPanel(new BorderLayout(0, 7));
        south.setOpaque(false);
        south.add(actions, BorderLayout.NORTH);
        south.add(statusLine, BorderLayout.SOUTH);

        outer.add(header, BorderLayout.NORTH);
        outer.add(dialogueScroll, BorderLayout.CENTER);
        outer.add(south, BorderLayout.SOUTH);
        return outer;
    }

    private JPanel buildNotebookPanel() {
        JPanel outer = cardPanel();
        outer.setLayout(new BorderLayout(0, 10));

        JPanel headingBox = new JPanel();
        headingBox.setLayout(new BoxLayout(headingBox, BoxLayout.Y_AXIS));
        headingBox.setOpaque(false);
        headingBox.add(label("CASE NOTEBOOK", 14, Font.BOLD, MUTED));
        headingBox.add(Box.createVerticalStrut(3));
        headingBox.add(label("Working theory • Original sources • Revision history", 11, Font.PLAIN, MUTED));
        outer.add(headingBox, BorderLayout.NORTH);

        configureNotebookArea(synthesisNotebookArea, 13, TEXT);
        configureNotebookArea(sourcesNotebookArea, 13, TEXT);
        configureNotebookArea(revisionNotebookArea, 12, new Color(205, 210, 219));

        notebookTabs.removeAll();
        notebookTabs.setFont(new Font("SansSerif", Font.BOLD, 12));
        notebookTabs.setBackground(PANEL);
        notebookTabs.setForeground(TEXT);
        notebookTabs.addTab("AI SYNTHESIS", notebookScroll(synthesisNotebookArea));
        notebookTabs.addTab("SOURCES", notebookScroll(sourcesNotebookArea));
        notebookTabs.addTab("REVISION LOG", notebookScroll(revisionNotebookArea));
        notebookTabs.addChangeListener(e -> {
            if (notebookTabs.getSelectedIndex() == 1)
                originalTabViewed = true;
        });

        outer.add(notebookTabs, BorderLayout.CENTER);
        return outer;
    }

    private void configureNotebookArea(JTextArea area, int fontSize, Color foreground) {
        area.setFont(new Font("SansSerif", Font.PLAIN, fontSize));
        area.setForeground(foreground);
        area.setBackground(PANEL_2);
        area.setOpaque(true);
        area.setBorder(new EmptyBorder(14, 14, 14, 14));
        area.setFocusable(true);
    }

    private JScrollPane notebookScroll(JTextArea area) {
        JScrollPane scroll = new JScrollPane(area);
        scroll.setBorder(new LineBorder(new Color(55, 61, 72), 1, true));
        scroll.getViewport().setBackground(PANEL_2);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        return scroll;
    }

    private JPanel buildBottomBar() {
        JPanel bottom = new JPanel(new BorderLayout(12, 0));
        bottom.setOpaque(false);

        JPanel evidenceCard = cardPanel();
        evidenceCard.setLayout(new BorderLayout(10, 0));
        evidenceCard.add(label("EVIDENCE", 13, Font.BOLD, MUTED), BorderLayout.WEST);

        evidenceListPanel.setLayout(new FlowLayout(FlowLayout.LEFT, 8, 0));
        evidenceListPanel.setOpaque(false);
        evidenceCard.add(evidenceListPanel, BorderLayout.CENTER);

        stylePrimary(reconstructButton);
        reconstructButton.addActionListener(e -> requestEarlyFinal());
        reconstructButton.setEnabled(false);

        bottom.add(evidenceCard, BorderLayout.CENTER);
        bottom.add(reconstructButton, BorderLayout.EAST);
        return bottom;
    }

    private void startInvestigationClock() {
        if (investigationStarted)
            return;
        investigationStarted = true;
        investigationClosed = false;
        secondsRemaining = INVESTIGATION_SECONDS;
        investigationTimer.start();
        refreshAll();
    }

    private void onTimerTick() {
        if (!investigationStarted || investigationClosed || gameFinished)
            return;
        secondsRemaining = Math.max(0, secondsRemaining - 1);
        refreshStats();
        if (secondsRemaining == 180) {
            statusLine.setForeground(WARNING);
            statusLine.setText("3 MENIT TERSISA • pilih interview / Ask More yang paling bernilai.");
        } else if (secondsRemaining == 60) {
            statusLine.setForeground(DANGER);
            statusLine.setText(
                    "1 MENIT TERSISA • Final AI Summary akan memakai hanya informasi yang sudah kamu kumpulkan.");
        } else if (secondsRemaining <= 0) {
            closeInvestigationAndPrepareFinal(true);
        }
    }

    private String formatTime(int totalSeconds) {
        int minutes = Math.max(0, totalSeconds) / 60;
        int seconds = Math.max(0, totalSeconds) % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }

    private void requestEarlyFinal() {
        if (investigationClosed || interviewed.size() < MIN_INTERVIEWS_FOR_EARLY_FINAL)
            return;
        String message = "Akhiri investigasi sekarang?\n\n" +
                "Interview: " + interviewed.size() + "/" + characters.size() + "\n" +
                "Ask More used: " + askedMore.size() + "/3\n" +
                "Time left: " + formatTime(secondsRemaining) + "\n\n" +
                "Informasi yang belum kamu gali tidak akan masuk ke Final AI Summary.";
        int choice = JOptionPane.showConfirmDialog(this, message, "End investigation?",
                JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
        if (choice == JOptionPane.YES_OPTION) {
            closeInvestigationAndPrepareFinal(false);
        }
    }

    private void closeInvestigationAndPrepareFinal(boolean timeExpired) {
        if (investigationClosed)
            return;
        investigationClosed = true;
        investigationTimer.stop();
        if (timeExpired) {
            statusLine.setForeground(DANGER);
            statusLine.setText("TIME UP • investigation closed");
        }
        prepareFinalFlow();
    }

    // ============================================================
    // INVESTIGATION LOGIC
    // ============================================================

    private void selectCharacter(String key) {
        if (!isCharacterUnlocked(key))
            return;
        selectedCharacter = key;
        statusLine.setText(" ");
        refreshPeopleList();
        refreshSelectedCharacter();
    }

    private boolean isCharacterUnlocked(String key) {
        return switch (key) {
            case "Arya" -> true;
            case "Kevin", "Bella", "Dimas" -> interviewed.contains("Arya");
            case "Fajar" -> interviewed.contains("Bella");
            case "Siska" -> interviewed.contains("Arya") && interviewed.contains("Bella");
            case "Rafi" -> interviewed.contains("Dimas") && interviewed.contains("Siska");
            case "Chris" -> interviewed.contains("Rafi");
            case "Nina", "Leo" -> interviewed.contains("Chris");
            case "Maya" -> interviewed.contains("Leo");
            default -> false;
        };
    }

    private String lockedReason(String key) {
        return switch (key) {
            case "Kevin", "Bella", "Dimas" -> "start with Arya";
            case "Fajar" -> "after Bella";
            case "Siska" -> "after Arya + Bella";
            case "Rafi" -> "after Dimas + 17:56 photo";
            case "Chris" -> "after table → crate chain";
            case "Nina", "Leo" -> "after Chris";
            case "Maya" -> "after Leo";
            default -> "Locked";
        };
    }

    private void onHearStatement(ActionEvent e) {
        if (gameFinished || investigationClosed || !isCharacterUnlocked(selectedCharacter))
            return;

        boolean firstTime = interviewed.add(selectedCharacter);
        if (firstTime) {
            Set<Integer> before = new HashSet<>(unlockedEvidence);
            unlockEvidenceByStoryProgress();
            recordNoteRevision("Statement: " + selectedCharacter);

            statusLine.setForeground(SUCCESS);
            if (!before.equals(unlockedEvidence)) {
                statusLine.setText("AI NOTE UPDATED • NEW EVIDENCE / PEOPLE UNLOCKED ✓");
            } else {
                statusLine.setText("AI WORKING THEORY UPDATED ✓");
            }
        }
        refreshAll();
    }

    private void onAskMore(ActionEvent e) {
        if (gameFinished || investigationClosed)
            return;
        if (!interviewed.contains(selectedCharacter)) {
            statusLine.setForeground(WARNING);
            statusLine.setText("Dengarkan statement awal terlebih dahulu.");
            return;
        }
        if (askedMore.contains(selectedCharacter)) {
            statusLine.setForeground(MUTED);
            statusLine.setText("Karakter ini sudah pernah di-Ask More.");
            return;
        }
        if (askMoreRemaining <= 0) {
            statusLine.setForeground(DANGER);
            statusLine.setText("Ask More sudah habis.");
            return;
        }

        askedMore.add(selectedCharacter);
        askMoreRemaining--;
        recordNoteRevision("Ask More: " + selectedCharacter);
        statusLine.setForeground(SUCCESS);
        statusLine.setText("DETAIL BARU MENGUBAH AI WORKING THEORY ✓");
        refreshAll();
    }

    /**
     * Evidence and new interview targets unlock because the story creates a reason
     * to inspect them,
     * not merely because an arbitrary number of interviews has been reached.
     */
    private void unlockEvidenceByStoryProgress() {
        // Evidence appears when a source or prior interview gives the player a reason
        // to inspect it.
        if (interviewed.contains("Arya")) {
            unlockedEvidence.add(1); // Arya refers to the return record.
        }
        if (interviewed.contains("Siska")) {
            unlockedEvidence.add(2); // Siska owns the 17:56 photo.
        }
        if (interviewed.contains("Rafi")) {
            unlockedEvidence.add(3); // Cleanup assignment becomes relevant to the handoff gap.
            unlockedEvidence.add(4); // 18:06 status anchors the end of table cleanup.
        }
        if (interviewed.contains("Maya")) {
            unlockedEvidence.add(5); // Storage photo follows the later multimedia-room accounts.
        }
    }

    private void recordNoteRevision(String trigger) {
        String synthesis = buildCaseSynthesis();
        if (!synthesis.equals(lastRecordedSynthesis)) {
            noteHistory.add(new NoteRevision(trigger, synthesis));
            lastRecordedSynthesis = synthesis;
        }
    }

    private void refreshAll() {
        refreshStats();
        refreshPeopleList();
        refreshSelectedCharacter();
        refreshNotebook();
        refreshEvidence();
        boolean enoughForEarlyFinal = interviewed.size() >= MIN_INTERVIEWS_FOR_EARLY_FINAL;
        reconstructButton.setEnabled(!investigationClosed && enoughForEarlyFinal);
        if (!enoughForEarlyFinal) {
            int need = MIN_INTERVIEWS_FOR_EARLY_FINAL - interviewed.size();
            reconstructButton.setToolTipText(
                    "Interview " + need + " orang lagi sebelum kamu boleh mengakhiri investigasi lebih awal.");
        } else if (interviewed.size() < characters.size() || askMoreRemaining > 0) {
            reconstructButton.setToolTipText(
                    "Kamu boleh selesai sekarang. Interview dan Ask More yang belum dipakai akan tetap menjadi informasi yang tidak kamu miliki.");
        } else {
            reconstructButton.setToolTipText("Semua sumber sudah kamu buka. Kamu bisa masuk ke Final AI Summary.");
        }
    }

    private void refreshStats() {
        interviewCountLabel.setText("Interviewed: " + interviewed.size() + "/" + characters.size());
        askMoreCountLabel.setText("Ask More used: " + askedMore.size() + "/3");
        timerLabel.setText("TIME " + formatTime(secondsRemaining));
        timerLabel.setForeground(secondsRemaining <= 60 ? DANGER : (secondsRemaining <= 180 ? WARNING : SUCCESS));
    }

    private String peopleContext(String key) {
        return switch (key) {
            case "Arya" -> "Last recorded user";
            case "Kevin" -> "Saw pre-return bump";
            case "Bella" -> "Handled bag + camera";
            case "Fajar" -> "Saw Bella at table";
            case "Siska" -> "17:56 photo";
            case "Dimas" -> "Cleared camera table";
            case "Rafi" -> "Saw table → crate window";
            case "Chris" -> "Transported crate";
            case "Nina" -> "Saw doorway impact";
            case "Leo" -> "Tripod event";
            case "Maya" -> "Second view of tripod";
            default -> "Case witness";
        };
    }

    private void addPeopleSection(String title, List<String> keys) {
        JLabel section = label(title, 10, Font.BOLD, MUTED);
        section.setBorder(new EmptyBorder(7, 4, 5, 4));
        section.setAlignmentX(Component.LEFT_ALIGNMENT);
        peopleListPanel.add(section);

        for (String key : keys) {
            CharacterData c = characters.get(key);
            JButton btn = new JButton();
            btn.setLayout(new BorderLayout());
            btn.setHorizontalAlignment(SwingConstants.LEFT);
            btn.setFocusPainted(false);
            btn.setMaximumSize(new Dimension(Integer.MAX_VALUE, 78));
            btn.setPreferredSize(new Dimension(235, 78));
            btn.setMinimumSize(new Dimension(205, 78));

            boolean unlocked = isCharacterUnlocked(key);
            boolean selected = key.equals(selectedCharacter) && unlocked;
            boolean seen = interviewed.contains(key);
            boolean more = askedMore.contains(key);

            btn.setEnabled(unlocked);
            btn.setCursor(unlocked ? Cursor.getPredefinedCursor(Cursor.HAND_CURSOR) : Cursor.getDefaultCursor());
            btn.setBackground(selected ? new Color(52, 65, 88) : (unlocked ? PANEL_2 : new Color(29, 31, 36)));
            btn.setForeground(unlocked ? TEXT : MUTED);
            btn.setBorder(BorderFactory.createCompoundBorder(
                    new LineBorder(selected ? ACCENT : new Color(55, 61, 72), 1, true),
                    new EmptyBorder(8, 10, 8, 10)));

            JPanel text = new JPanel();
            text.setOpaque(false);
            text.setLayout(new BoxLayout(text, BoxLayout.Y_AXIS));
            text.add(label(c.name, 13, Font.BOLD, unlocked ? TEXT : MUTED));
            text.add(label(peopleContext(key), 10, Font.PLAIN, unlocked ? new Color(200, 205, 214) : MUTED));
            String state;
            Color stateColor;
            if (!unlocked) {
                state = "Locked • " + lockedReason(key);
                stateColor = MUTED;
            } else if (more) {
                state = "Done + Ask More";
                stateColor = SUCCESS;
            } else if (seen) {
                state = "Statement heard";
                stateColor = SUCCESS;
            } else {
                state = "Available now";
                stateColor = ACCENT;
            }
            text.add(label(state, 10, Font.PLAIN, stateColor));
            btn.add(text, BorderLayout.CENTER);
            btn.addActionListener(e -> selectCharacter(key));
            peopleListPanel.add(btn);
            peopleListPanel.add(Box.createVerticalStrut(6));
        }
    }

    private void refreshPeopleList() {
        peopleListPanel.removeAll();
        addPeopleSection("STEP 1 • BEFORE 17:56", List.of("Arya", "Kevin", "Bella", "Fajar", "Siska"));
        addPeopleSection("STEP 2 • TABLE → CRATE", List.of("Dimas", "Rafi", "Chris"));
        addPeopleSection("STEP 3 • MULTIMEDIA ROOM", List.of("Nina", "Leo", "Maya"));
        peopleListPanel.revalidate();
        peopleListPanel.repaint();
    }

    private void refreshSelectedCharacter() {
        if (!isCharacterUnlocked(selectedCharacter)) {
            selectedCharacter = "Arya";
        }

        CharacterData c = characters.get(selectedCharacter);
        selectedNameLabel.setText(c.name);
        selectedRoleLabel.setText(c.role);

        boolean seen = interviewed.contains(selectedCharacter);
        boolean more = askedMore.contains(selectedCharacter);

        String intro = "WHY THIS PERSON MATTERS\n\n" + c.whyInterview.strip() + "\n\n";

        if (!seen) {
            dialogueArea.setText(
                    intro +
                            "BEFORE THE INTERVIEW\n\n" +
                            "Orang ini bukan ditampilkan sebagai tersangka. Ia relevan karena bisa mengisi bagian tertentu dari perjalanan kamera. "
                            +
                            "Tekan DENGARKAN STATEMENT untuk mendengar keterangannya. Setelah itu AI Case Note akan memperbarui working theory berdasarkan apa yang baru dikatakan.");
        } else if (!more) {
            dialogueArea.setText(
                    intro +
                            "INITIAL STATEMENT\n\n" +
                            c.initialStatement.strip() +
                            "\n\n────────────────────────────────\n" +
                            "Kamu masih bisa menggunakan Ask More pada orang ini jika detailnya penting.");
        } else {
            dialogueArea.setText(
                    intro +
                            "INITIAL STATEMENT\n\n" +
                            c.initialStatement.strip() + "\n\n" +
                            "ASK MORE\n\nQ: " + c.askMoreQuestion + "\n\n" +
                            c.askMoreAnswer.strip());
        }
        dialogueArea.setCaretPosition(0);

        hearStatementButton.setText(seen ? "STATEMENT HEARD ✓" : "DENGARKAN STATEMENT");
        hearStatementButton.setEnabled(!seen && isCharacterUnlocked(selectedCharacter));

        if (investigationClosed) {
            hearStatementButton.setEnabled(false);
            askMoreButton.setEnabled(false);
            askMoreButton.setText("INVESTIGATION CLOSED");
        } else if (!seen) {
            askMoreButton.setEnabled(false);
            askMoreButton.setText("ASK MORE");
        } else if (more) {
            askMoreButton.setEnabled(false);
            askMoreButton.setText("ASKED ✓");
        } else if (askMoreRemaining <= 0) {
            askMoreButton.setEnabled(false);
            askMoreButton.setText("ASK MORE — HABIS");
        } else {
            askMoreButton.setEnabled(true);
            askMoreButton.setText("ASK MORE  (" + askMoreRemaining + " LEFT)");
        }
    }

    private void refreshNotebook() {
        String synthesis = interviewed.isEmpty()
                ? "AI CASE SYNTHESIS\n\nBelum ada statement. AI belum punya working theory."
                : buildCaseSynthesis();
        synthesisNotebookArea.setText(synthesis);
        synthesisNotebookArea.setCaretPosition(0);

        StringBuilder sources = new StringBuilder();
        if (interviewed.isEmpty()) {
            sources.append("Belum ada source yang dibuka.");
        } else {
            for (String key : characters.keySet()) {
                if (!interviewed.contains(key))
                    continue;
                CharacterData c = characters.get(key);
                sources.append(c.name).append(" — ").append(c.role).append("\n");
                sources.append(c.initialStatement.strip()).append("\n");
                if (askedMore.contains(key)) {
                    sources.append("\nASK MORE — ").append(c.askMoreQuestion).append("\n");
                    sources.append(c.askMoreAnswer.strip()).append("\n");
                }
                sources.append("\n────────────────────────────────────\n\n");
            }
        }
        sourcesNotebookArea.setText(sources.toString());
        sourcesNotebookArea.setCaretPosition(0);

        StringBuilder history = new StringBuilder();
        if (noteHistory.isEmpty()) {
            history.append(
                    "Belum ada revision.\n\nSetiap statement atau Ask More yang mengubah working theory akan tercatat di sini.");
        } else {
            int start = Math.max(0, noteHistory.size() - 6);
            for (int i = noteHistory.size() - 1; i >= start; i--) {
                NoteRevision r = noteHistory.get(i);
                history.append("REVISION ").append(i + 1).append(" • ").append(r.trigger()).append("\n");
                history.append(r.synthesis()).append("\n\n");
                history.append("════════════════════════════════════\n\n");
            }
        }
        revisionNotebookArea.setText(history.toString());
        revisionNotebookArea.setCaretPosition(0);
    }

    /**
     * Deterministic AI-style synthesis.
     * Important: it intentionally makes realistic reasoning mistakes:
     * - treats self-report as verified fact,
     * - converts correlation into causation,
     * - becomes too certain from partial evidence,
     * - later rewrites earlier conclusions when contradictory evidence arrives.
     */
    private LinkedHashMap<String, Integer> computeDamageScores() {
        LinkedHashMap<String, Integer> scores = new LinkedHashMap<>();
        scores.put("Arya", 0);
        scores.put("Bella", 0);
        scores.put("Dimas", 0);
        scores.put("Chris", 0);
        scores.put("Leo", 0);

        // Initial accounts create several plausible causal histories.
        if (interviewed.contains("Arya"))
            scores.merge("Arya", 4, Integer::sum);
        if (interviewed.contains("Kevin"))
            scores.merge("Arya", 10, Integer::sum);

        if (interviewed.contains("Bella"))
            scores.merge("Bella", 6, Integer::sum);
        if (interviewed.contains("Fajar"))
            scores.merge("Bella", 10, Integer::sum);

        if (interviewed.contains("Dimas"))
            scores.merge("Dimas", 14, Integer::sum);
        if (interviewed.contains("Rafi"))
            scores.merge("Dimas", 10, Integer::sum);

        if (interviewed.contains("Chris"))
            scores.merge("Chris", 7, Integer::sum);
        if (interviewed.contains("Nina"))
            scores.merge("Chris", 20, Integer::sum);

        if (interviewed.contains("Leo"))
            scores.merge("Leo", 15, Integer::sum);
        if (interviewed.contains("Maya"))
            scores.merge("Leo", 10, Integer::sum);

        // Ask More details materially alter what the AI has available to synthesize.
        if (askedMore.contains("Arya"))
            scores.merge("Arya", 16, Integer::sum);
        if (askedMore.contains("Kevin"))
            scores.merge("Arya", 22, Integer::sum);
        if (askedMore.contains("Arya") && askedMore.contains("Kevin"))
            scores.merge("Arya", 12, Integer::sum);

        if (askedMore.contains("Bella"))
            scores.merge("Bella", 16, Integer::sum);
        if (askedMore.contains("Fajar"))
            scores.merge("Bella", 22, Integer::sum);
        if (askedMore.contains("Bella") && askedMore.contains("Fajar"))
            scores.merge("Bella", 12, Integer::sum);

        if (askedMore.contains("Dimas"))
            scores.merge("Dimas", 20, Integer::sum);
        if (askedMore.contains("Rafi"))
            scores.merge("Dimas", 18, Integer::sum);
        if (askedMore.contains("Dimas") && askedMore.contains("Rafi"))
            scores.merge("Dimas", 12, Integer::sum);

        if (askedMore.contains("Chris"))
            scores.merge("Chris", 20, Integer::sum);
        if (askedMore.contains("Nina"))
            scores.merge("Chris", 18, Integer::sum);
        if (askedMore.contains("Chris") && askedMore.contains("Nina"))
            scores.merge("Chris", 12, Integer::sum);

        if (askedMore.contains("Leo"))
            scores.merge("Leo", 20, Integer::sum);
        if (askedMore.contains("Maya"))
            scores.merge("Leo", 18, Integer::sum);
        if (askedMore.contains("Leo") && askedMore.contains("Maya"))
            scores.merge("Leo", 12, Integer::sum);

        // Siska's Ask More does not identify a culprit; it tells the model the 17:56
        // photo
        // cannot be used to eliminate pre-17:56 damage theories.
        if (askedMore.contains("Siska")) {
            scores.merge("Arya", 3, Integer::sum);
            scores.merge("Bella", 3, Integer::sum);
        }
        return scores;
    }

    private List<Map.Entry<String, Integer>> rankedDamageCandidates() {
        List<Map.Entry<String, Integer>> ranking = new ArrayList<>(computeDamageScores().entrySet());
        ranking.sort((a, b) -> {
            int byScore = Integer.compare(b.getValue(), a.getValue());
            if (byScore != 0)
                return byScore;
            // Stable tie-break: later, more concrete physical events rank slightly ahead.
            List<String> order = List.of("Chris", "Leo", "Dimas", "Bella", "Arya");
            return Integer.compare(order.indexOf(a.getKey()), order.indexOf(b.getKey()));
        });
        return ranking;
    }

    private int likelihoodPercent(String candidate) {
        LinkedHashMap<String, Integer> scores = computeDamageScores();
        int total = scores.values().stream().mapToInt(v -> Math.max(1, v)).sum();
        return (int) Math.round(100.0 * Math.max(1, scores.getOrDefault(candidate, 1)) / total);
    }

    private String topDamageCandidate() {
        return rankedDamageCandidates().get(0).getKey();
    }

    private String candidateReason(String candidate) {
        List<String> reasons = new ArrayList<>();
        switch (candidate) {
            case "Arya" -> {
                if (interviewed.contains("Arya"))
                    reasons.add("Arya had custody immediately before the return record.");
                if (interviewed.contains("Kevin"))
                    reasons.add("Kevin heard / observed a pre-return contact near the metal railing.");
                if (askedMore.contains("Arya"))
                    reasons.add("Arya disclosed that the camera swung into the railing.");
                if (askedMore.contains("Kevin"))
                    reasons.add("Kevin directly corroborated camera-to-railing contact.");
            }
            case "Bella" -> {
                if (interviewed.contains("Bella"))
                    reasons.add("Bella physically interacted with the camera while freeing the bag strap.");
                if (interviewed.contains("Fajar"))
                    reasons.add("Fajar heard a small impact while Bella was at the table.");
                if (askedMore.contains("Bella"))
                    reasons.add("Bella disclosed that the camera touched the table edge.");
                if (askedMore.contains("Fajar"))
                    reasons.add("Fajar corroborated seeing the camera hit the table edge.");
            }
            case "Dimas" -> {
                if (interviewed.contains("Dimas"))
                    reasons.add(
                            "Dimas handled the table during the exact window in which the camera entered the crate.");
                if (interviewed.contains("Rafi"))
                    reasons.add("Rafi saw Dimas move a pile containing a black object toward the crate.");
                if (askedMore.contains("Dimas"))
                    reasons.add("Dimas said multiple items were placed into the crate together and collided inside.");
                if (askedMore.contains("Rafi"))
                    reasons.add(
                            "Rafi described a camera-shaped object and a heavy sound as the pile entered the crate.");
            }
            case "Chris" -> {
                if (interviewed.contains("Chris"))
                    reasons.add("Chris transported the closed crate containing the camera.");
                if (interviewed.contains("Nina"))
                    reasons.add("Nina independently confirmed a clear doorway impact.");
                if (askedMore.contains("Chris"))
                    reasons.add("Chris described the impact as strong enough to make him stop.");
                if (askedMore.contains("Nina"))
                    reasons.add("Nina reported the crate rebounded and its contents shifted.");
            }
            case "Leo" -> {
                if (interviewed.contains("Leo"))
                    reasons.add("A tripod fell toward the crate after it reached multimedia.");
                if (interviewed.contains("Maya"))
                    reasons.add("Maya independently heard the later impact and saw the tripod beside the crate.");
                if (askedMore.contains("Leo"))
                    reasons.add("Leo reported a tripod leg ended against the crate and the crate appeared to move.");
                if (askedMore.contains("Maya"))
                    reasons.add("Maya also described the tripod touching the crate after the impact.");
            }
        }
        if (reasons.isEmpty())
            return "No meaningful source about this theory was collected in your investigation path.";
        return String.join(" ", reasons);
    }

    private String buildRankingText() {
        StringBuilder out = new StringBuilder();
        List<Map.Entry<String, Integer>> ranking = rankedDamageCandidates();
        for (int i = 0; i < ranking.size(); i++) {
            String name = ranking.get(i).getKey();
            out.append(i + 1).append(". ").append(name.toUpperCase())
                    .append(" — ").append(likelihoodPercent(name)).append("% estimated likelihood");
            if (i < ranking.size() - 1)
                out.append("\n");
        }
        return out.toString();
    }

    private String buildCaseSynthesis() {
        if (interviewed.isEmpty()) {
            return "AI CASE SYNTHESIS\n\nBelum ada statement. Mulai dari Arya untuk membentuk working theory.";
        }

        List<Map.Entry<String, Integer>> ranking = rankedDamageCandidates();
        String top = ranking.get(0).getKey();
        String second = ranking.get(1).getKey();

        StringBuilder body = new StringBuilder();
        body.append("AI CASE SYNTHESIS\n");
        body.append("Working theory generated from the information currently available\n\n");
        body.append("CURRENT BEST ESTIMATE\n");
        body.append(top.toUpperCase()).append(" is currently the most likely damage source (about ")
                .append(likelihoodPercent(top)).append("% in the current ranking).\n\n");

        if (interviewed.contains("Arya")) {
            body.append("Arya's 17:48 return entry initially suggests his handling ended there. ");
            if (interviewed.contains("Kevin")) {
                body.append("Kevin adds a possible pre-return impact, so the model keeps Arya in the damage ranking. ");
            }
            if (askedMore.contains("Arya") || askedMore.contains("Kevin")) {
                body.append("The extra detail makes the railing contact materially more important. ");
            }
            body.append("\n\n");
        }

        if (interviewed.contains("Bella")) {
            body.append(
                    "Bella did not carry the camera away in the bag, but she did interact with the camera while freeing the strap. ");
            if (interviewed.contains("Fajar"))
                body.append("Fajar's account adds a small impact at the table. ");
            if (askedMore.contains("Bella") || askedMore.contains("Fajar"))
                body.append("Ask More makes that contact more concrete and increases Bella's ranking. ");
            body.append("\n\n");
        }

        if (interviewed.contains("Siska")) {
            body.append(
                    "The 17:56 photo fixes the camera's LOCATION on the documentation table and separates it from Bella's bag. ");
            if (askedMore.contains("Siska"))
                body.append(
                        "However, the photo cannot show whether the lens was already cracked, so it does not remove earlier damage theories. ");
            body.append("\n\n");
        }

        if (interviewed.contains("Dimas")) {
            body.append("Dimas provides the strongest route from table to crate. ");
            if (interviewed.contains("Rafi"))
                body.append("Rafi narrows the movement window and connects Dimas's pile to the closed crate. ");
            if (askedMore.contains("Dimas") || askedMore.contains("Rafi"))
                body.append("Extra detail also creates a possible damage event inside the crate during cleanup. ");
            body.append("\n\n");
        }

        if (interviewed.contains("Chris")) {
            body.append("Chris moves the closed crate to multimedia. ");
            if (interviewed.contains("Nina"))
                body.append("Nina independently confirms the doorway collision, making this a concrete later impact. ");
            if (askedMore.contains("Chris") || askedMore.contains("Nina"))
                body.append("Ask More increases the estimated force of that impact. ");
            body.append("\n\n");
        }

        if (interviewed.contains("Leo")) {
            body.append("Leo introduces a second later impact: the tripod fall. ");
            if (interviewed.contains("Maya"))
                body.append("Maya corroborates the timing and physical proximity to the crate. ");
            if (askedMore.contains("Leo") || askedMore.contains("Maya"))
                body.append("Extra detail makes actual tripod-to-crate contact more likely. ");
            body.append("\n\n");
        }

        body.append("WHY THE MODEL CURRENTLY LEANS ").append(top.toUpperCase()).append("\n");
        body.append(candidateReason(top)).append("\n\n");
        body.append("NEXT CLOSEST THEORY\n");
        body.append(second.toUpperCase()).append(" — ").append(likelihoodPercent(second))
                .append("% estimated likelihood.\n\n");
        body.append("CURRENT RANKING\n").append(buildRankingText());
        return body.toString();
    }

    private JPanel buildKnownFactsStrip() {
        JPanel p = new JPanel();
        p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
        p.setBackground(PANEL_2);
        p.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(58, 63, 73), 1, true),
                new EmptyBorder(11, 12, 11, 12)));
        p.setMaximumSize(new Dimension(Integer.MAX_VALUE, 180));
        JLabel title = label("CURRENT CASE STATUS", 11, Font.BOLD, MUTED);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);
        p.add(title);
        p.add(Box.createVerticalStrut(6));

        String status;
        if (interviewed.size() < 3) {
            status = "Early picture — first sequence is forming.";
        } else if (interviewed.size() < MIN_INTERVIEWS_FOR_EARLY_FINAL) {
            status = "Keep investigating — you need at least " + MIN_INTERVIEWS_FOR_EARLY_FINAL
                    + " interviews before ending early.";
        } else if (interviewed.size() < 8) {
            status = "You may end now, or keep spending time to challenge the current AI theory.";
        } else if (interviewed.size() < characters.size()) {
            status = "Broad coverage collected. Remaining interviews may still change the AI ranking.";
        } else {
            status = "All available interviews collected; unused Ask More remain optional.";
        }
        JLabel body = label(status, 12, Font.PLAIN, TEXT);
        body.setAlignmentX(Component.LEFT_ALIGNMENT);
        p.add(body);
        return p;
    }

    private JPanel synthesisEntry(String content) {
        JPanel entry = new JPanel(new BorderLayout(0, 8));
        entry.setBackground(PANEL_2);
        entry.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(65, 86, 122), 1, true),
                new EmptyBorder(13, 14, 13, 14)));
        entry.setMaximumSize(new Dimension(Integer.MAX_VALUE, 1200));

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        top.add(label("AI CASE SYNTHESIS", 12, Font.BOLD, ACCENT), BorderLayout.WEST);
        top.add(label("LIVE", 10, Font.BOLD, SUCCESS), BorderLayout.EAST);

        JTextArea body = createTextArea();
        body.setText(content);
        body.setFont(new Font("SansSerif", Font.PLAIN, 13));
        body.setForeground(TEXT);
        body.setBackground(PANEL_2);
        body.setRows(Math.max(8, Math.min(38, content.length() / 75)));

        entry.add(top, BorderLayout.NORTH);
        entry.add(body, BorderLayout.CENTER);
        return entry;
    }

    private JPanel revisionEntry(String trigger, String content) {
        JPanel entry = new JPanel(new BorderLayout(0, 6));
        entry.setBackground(new Color(31, 34, 40));
        entry.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(54, 59, 69), 1, true),
                new EmptyBorder(9, 10, 9, 10)));
        entry.setMaximumSize(new Dimension(Integer.MAX_VALUE, 260));

        entry.add(label(trigger, 10, Font.BOLD, MUTED), BorderLayout.NORTH);
        JTextArea body = createTextArea();
        body.setText(content);
        body.setFont(new Font("SansSerif", Font.PLAIN, 11));
        body.setForeground(new Color(196, 201, 210));
        body.setRows(Math.max(4, Math.min(10, content.length() / 105)));
        entry.add(body, BorderLayout.CENTER);
        return entry;
    }

    private JPanel emptyNotebookMessage(String text) {
        JPanel p = new JPanel(new BorderLayout());
        p.setOpaque(false);
        JLabel l = label(text, 13, Font.PLAIN, MUTED);
        l.setBorder(new EmptyBorder(16, 8, 8, 8));
        p.add(l, BorderLayout.NORTH);
        return p;
    }

    private JPanel notebookEntry(String name, String content, boolean updated) {
        JPanel entry = new JPanel(new BorderLayout(0, 7));
        entry.setBackground(PANEL_2);
        entry.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(58, 63, 73), 1, true),
                new EmptyBorder(11, 12, 11, 12)));
        entry.setMaximumSize(new Dimension(Integer.MAX_VALUE, 420));

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        top.add(label(name.toUpperCase(), 12, Font.BOLD, ACCENT), BorderLayout.WEST);
        if (updated)
            top.add(label("ASK MORE INCLUDED", 10, Font.BOLD, SUCCESS), BorderLayout.EAST);

        JTextArea body = createTextArea();
        body.setText(content);
        body.setFont(new Font("SansSerif", Font.PLAIN, 13));
        body.setForeground(TEXT);
        body.setBackground(PANEL_2);
        body.setRows(Math.max(6, Math.min(18, content.length() / 80)));

        entry.add(top, BorderLayout.NORTH);
        entry.add(body, BorderLayout.CENTER);
        return entry;
    }

    private void refreshEvidence() {
        evidenceListPanel.removeAll();
        if (unlockedEvidence.isEmpty()) {
            evidenceListPanel.add(
                    label("Mulai dari orang yang tersedia. Evidence akan muncul ketika ada alasan untuk memeriksanya.",
                            12, Font.PLAIN, MUTED));
        } else {
            if (unlockedEvidence.contains(1))
                evidenceListPanel.add(evidenceButton(1, "RETURN SHEET"));
            if (unlockedEvidence.contains(2))
                evidenceListPanel.add(evidenceButton(2, "17:56 PHOTO"));
            if (unlockedEvidence.contains(3))
                evidenceListPanel.add(evidenceButton(3, "CLEANUP BOARD"));
            if (unlockedEvidence.contains(4))
                evidenceListPanel.add(evidenceButton(4, "18:06 LOG"));
            if (unlockedEvidence.contains(5))
                evidenceListPanel.add(evidenceButton(5, "18:28 PHOTO"));
        }
        evidenceListPanel.revalidate();
        evidenceListPanel.repaint();
    }

    private JButton evidenceButton(int id, String text) {
        JButton b = new JButton(text);
        styleMini(b);
        b.addActionListener(e -> showEvidence(id));
        return b;
    }

    private void showEvidence(int id) {
        String title;
        String content;
        switch (id) {
            case 1 -> {
                title = "EVIDENCE 1 — RETURN SHEET";
                content = "CAMERA RETURN\n\nArya\n17:48\nReturned ✓\n\nThe sheet records a completed return entry. It does not show where the camera was physically stored.";
            }
            case 2 -> {
                title = "EVIDENCE 2 — 17:56 EVENT PHOTO";
                content = "Timestamp: 17:56\n\nThe school camera is clearly visible on the documentation table.\nBella is visible farther away carrying the camera bag.\n\nAt 17:56, the camera and the bag were in different places.";
            }
            case 3 -> {
                title = "EVIDENCE 3 — CLEANUP BOARD";
                content = "CLEANUP ASSIGNMENTS\n\nDocumentation table — Dimas\nGray equipment crate → Multimedia — Chris\nTripods / stands — Leo\n\nThis assigns responsibility for areas, not proof of every action performed.";
            }
            case 4 -> {
                title = "EVIDENCE 4 — 18:06 CLEANUP LOG";
                content = "18:06 CHECK\n\nDocumentation table: CLEAR\nGray crate beside table: CLOSED / READY TO MOVE\nMultimedia transfer pending\n\nThe camera had been visible on the table ten minutes earlier.";
            }
            case 5 -> {
                title = "EVIDENCE 5 — 18:28 STORAGE PHOTO";
                content = "Timestamp: 18:28\n\nGray crate is on the multimedia-room floor.\nA tripod is leaning / lying immediately beside the crate.\n\nThe camera is inside the closed crate, so the photo does not show whether its lens was already cracked.";
            }
            default -> {
                return;
            }
        }
        showTextDialog(title, content);
    }

    // ============================================================
    // FINAL SCREEN
    // ============================================================

    private JPanel buildFinalScreen() {
        JPanel page = new JPanel(new BorderLayout(0, 16));
        page.setBackground(BG);
        page.setBorder(new EmptyBorder(22, 26, 22, 26));

        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.Y_AXIS));
        header.setOpaque(false);
        header.add(label("FINAL RECONSTRUCTION", 30, Font.BOLD, TEXT));
        header.add(Box.createVerticalStrut(4));
        header.add(label(
                "The AI synthesized only the interviews and follow-ups YOU chose to collect before ending the investigation.",
                14, Font.PLAIN, MUTED));
        page.add(header, BorderLayout.NORTH);

        finalFlowPanel.setOpaque(false);
        page.add(finalFlowPanel, BorderLayout.CENTER);

        JPanel bottom = new JPanel(new BorderLayout());
        bottom.setOpaque(false);
        JButton back = secondaryButton("← REVIEW COLLECTED CASE");
        back.addActionListener(e -> rootLayout.show(root, "INVESTIGATION"));
        bottom.add(back, BorderLayout.WEST);
        page.add(bottom, BorderLayout.SOUTH);

        return page;
    }

    private void prepareFinalFlow() {
        investigationClosed = true;
        investigationTimer.stop();
        finalSummarySnapshot = buildFinalSummarySnapshot();
        finalDecisionMode = null;
        changedConclusion = null;
        finalBranchAnswers.clear();
        changeConclusionGroup.clearSelection();
        useEvidenceGroup.clearSelection();
        useWeaknessGroup.clearSelection();
        changeEvidenceGroup.clearSelection();
        changeReasonGroup.clearSelection();
        setFinalFlowContent(buildFinalDecisionStep());
        rootLayout.show(root, "FINAL");
    }

    private void setFinalFlowContent(JPanel content) {
        finalFlowPanel.removeAll();
        finalFlowPanel.add(content, "CURRENT");
        finalFlowLayout.show(finalFlowPanel, "CURRENT");
        finalFlowPanel.revalidate();
        finalFlowPanel.repaint();
    }

    private FinalSummary buildFinalSummarySnapshot() {
        List<Map.Entry<String, Integer>> ranking = rankedDamageCandidates();
        String top = ranking.get(0).getKey();
        String second = ranking.get(1).getKey();
        String third = ranking.get(2).getKey();
        int gap12 = ranking.get(0).getValue() - ranking.get(1).getValue();
        int gap13 = ranking.get(0).getValue() - ranking.get(2).getValue();

        String shape;
        String conclusion;
        if (gap13 <= 8) {
            shape = "THREE_WAY";
            conclusion = top + ", " + second + ", and " + third
                    + " remain close possibilities; the AI gives a slight edge to " + top + ".";
        } else if (gap12 <= 7) {
            shape = "DUAL_CLOSE";
            conclusion = top + " and " + second + " are almost tied; the AI leans slightly toward " + top + ".";
        } else if (gap12 <= 15) {
            shape = "LEAN_PAIR";
            conclusion = top + " is the leading theory, but " + second + " remains a serious alternative.";
        } else {
            shape = "SINGLE";
            conclusion = top + " is the AI's most likely cause of the cracked lens.";
        }

        String narrative = candidateReason(top);
        if (!shape.equals("SINGLE")) {
            narrative += "\n\nWhy the alternative stays alive: " + candidateReason(second);
        }
        if (shape.equals("THREE_WAY")) {
            narrative += "\n\nThird close theory: " + candidateReason(third);
        }

        return new FinalSummary(
                shape, top, second, third,
                likelihoodPercent(top), likelihoodPercent(second), likelihoodPercent(third),
                conclusion, narrative);
    }

    private JPanel buildFinalDecisionStep() {
        ViewportWidthPanel body = new ViewportWidthPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG);
        body.setBorder(new EmptyBorder(8, 0, 10, 8));

        body.add(buildFinalSummaryCard(finalSummarySnapshot, true));
        body.add(Box.createVerticalStrut(14));

        JPanel decision = cardPanel();
        decision.setLayout(new BoxLayout(decision, BoxLayout.Y_AXIS));
        decision.setAlignmentX(Component.CENTER_ALIGNMENT);
        decision.setMaximumSize(new Dimension(Integer.MAX_VALUE, 260));

        JLabel title = label("WHAT DO YOU DO WITH THIS AI CONCLUSION?", 14, Font.BOLD, ACCENT);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);
        decision.add(title);
        decision.add(Box.createVerticalStrut(8));
        JTextArea desc = createTextArea();
        desc.setText(
                "The summary above is the AI's final synthesis of the information you actually collected. Interviews you skipped and Ask More opportunities you left unused are absent from its context. You must either use that conclusion or replace it with your own.");
        desc.setFont(new Font("SansSerif", Font.PLAIN, 14));
        desc.setForeground(TEXT);
        desc.setAlignmentX(Component.LEFT_ALIGNMENT);
        desc.setMaximumSize(new Dimension(Integer.MAX_VALUE, 90));
        decision.add(desc);
        decision.add(Box.createVerticalStrut(14));

        JPanel buttons = new JPanel(new GridLayout(1, 2, 12, 0));
        buttons.setOpaque(false);
        buttons.setMaximumSize(new Dimension(Integer.MAX_VALUE, 52));
        JButton use = primaryButton("USE AI SUMMARY");
        JButton change = secondaryButton("CHANGE CONCLUSION");
        use.addActionListener(e -> {
            finalDecisionMode = "USE";
            setFinalFlowContent(buildUseSummaryBranch());
        });
        change.addActionListener(e -> {
            finalDecisionMode = "CHANGE";
            setFinalFlowContent(buildChangeSummaryBranch());
        });
        buttons.add(use);
        buttons.add(change);
        decision.add(buttons);
        body.add(decision);

        JScrollPane scroll = new JScrollPane(body);
        scroll.setBorder(null);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scroll.getVerticalScrollBar().setValue(0);

        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.setOpaque(false);
        wrapper.add(scroll, BorderLayout.CENTER);
        return wrapper;
    }

    private JPanel buildFinalSummaryCard(FinalSummary summary, boolean full) {
        JPanel card = cardPanel();
        card.setLayout(new BorderLayout(0, 12));
        card.setAlignmentX(Component.CENTER_ALIGNMENT);

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        top.add(label("FINAL AI SUMMARY", 14, Font.BOLD, ACCENT), BorderLayout.WEST);
        top.add(label(summaryBadge(summary.shape()), 10, Font.BOLD, WARNING), BorderLayout.EAST);
        card.add(top, BorderLayout.NORTH);

        JTextArea text = createTextArea();
        StringBuilder out = new StringBuilder();
        out.append("INTERVIEWS COMPLETED: ").append(interviewed.size()).append("/").append(characters.size())
                .append("\n");
        out.append("ASK MORE USED: ").append(askedMore.size()).append("/3");
        if (!askedMore.isEmpty())
            out.append(" — ").append(String.join(" • ", askedMore));
        out.append("\n\n");
        out.append("AI DAMAGE CONCLUSION\n").append(summary.conclusion()).append("\n\n");
        out.append("RELATIVE AI RANKING\n");
        out.append("1. ").append(summary.top()).append(" — ").append(summary.topPct()).append("%\n");
        out.append("2. ").append(summary.second()).append(" — ").append(summary.secondPct()).append("%\n");
        out.append("3. ").append(summary.third()).append(" — ").append(summary.thirdPct()).append("%\n");
        out.append(
                "\nThese percentages are a simulated relative ranking for this game, not proof and not a calibrated real-world probability.\n");
        if (full) {
            out.append("\nWHY THE AI ARRIVED HERE\n").append(summary.narrative());
        }
        text.setText(out.toString());
        text.setFont(new Font("SansSerif", Font.PLAIN, 14));
        text.setForeground(TEXT);
        text.setOpaque(true);
        text.setBackground(PANEL_2);
        text.setBorder(new EmptyBorder(14, 14, 14, 14));
        text.setRows(full ? 15 : 9);
        card.add(text, BorderLayout.CENTER);
        return card;
    }

    private String summaryBadge(String shape) {
        return switch (shape) {
            case "SINGLE" -> "ONE LEADING THEORY";
            case "LEAN_PAIR" -> "LEADER + ALTERNATIVE";
            case "DUAL_CLOSE" -> "TWO CLOSE THEORIES";
            default -> "MULTIPLE CLOSE THEORIES";
        };
    }

    private JPanel buildUseSummaryBranch() {
        finalBranchAnswers.remove(useEvidenceGroup);
        finalBranchAnswers.remove(useWeaknessGroup);
        useEvidenceGroup.clearSelection();
        useWeaknessGroup.clearSelection();

        ViewportWidthPanel body = new ViewportWidthPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG);
        body.setBorder(new EmptyBorder(8, 0, 12, 8));

        body.add(buildFinalSummaryCard(finalSummarySnapshot, false));
        body.add(Box.createVerticalStrut(12));

        String evidenceTarget = finalSummarySnapshot.shape().equals("SINGLE")
                ? finalSummarySnapshot.top()
                : finalSummarySnapshot.second();
        String q1 = finalSummarySnapshot.shape().equals("SINGLE")
                ? "You are using the AI's conclusion. Which detail most strongly drove its ranking of " + evidenceTarget
                        + "?"
                : "You are using a multi-theory AI summary. Which detail most strongly explains why " + evidenceTarget
                        + " remains close to " + finalSummarySnapshot.top() + "?";
        String correctEvidence = candidateStrongestEvidence(evidenceTarget);
        body.add(dynamicQuestionCard("FOLLOW-UP 1", q1, useEvidenceGroup,
                buildEvidenceOptions(evidenceTarget), finalBranchAnswers, null));
        body.add(Box.createVerticalStrut(12));

        String correctWeakness = candidateWeakness(finalSummarySnapshot.top());
        body.add(dynamicQuestionCard("FOLLOW-UP 2",
                "Even if you USE the AI summary, which limitation of its top theory should still remain in your mind?",
                useWeaknessGroup,
                buildWeaknessOptions(finalSummarySnapshot.top()), finalBranchAnswers, null));
        body.add(Box.createVerticalStrut(14));

        JPanel actions = new JPanel(new BorderLayout());
        actions.setOpaque(false);
        JButton back = secondaryButton("← CHANGE USE / CHANGE DECISION");
        back.addActionListener(e -> {
            finalDecisionMode = null;
            setFinalFlowContent(buildFinalDecisionStep());
        });
        JButton submit = primaryButton("LOCK FINAL DECISION →");
        submit.addActionListener(e -> {
            if (!finalBranchAnswers.containsKey(useEvidenceGroup)
                    || !finalBranchAnswers.containsKey(useWeaknessGroup)) {
                JOptionPane.showMessageDialog(this, "Jawab kedua follow-up terlebih dahulu.", "Belum lengkap",
                        JOptionPane.WARNING_MESSAGE);
                return;
            }
            changedConclusion = finalSummarySnapshot.conclusion();
            finishFinalDecision();
        });
        actions.add(back, BorderLayout.WEST);
        actions.add(submit, BorderLayout.EAST);
        body.add(actions);

        JScrollPane scroll = new JScrollPane(body);
        scroll.setBorder(null);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scroll.getVerticalScrollBar().setValue(0);
        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.setOpaque(false);
        wrapper.add(scroll, BorderLayout.CENTER);
        return wrapper;
    }

    private JPanel buildChangeSummaryBranch() {
        finalBranchAnswers.remove(changeEvidenceGroup);
        finalBranchAnswers.remove(changeReasonGroup);
        changeConclusionGroup.clearSelection();
        changeEvidenceGroup.clearSelection();
        changeReasonGroup.clearSelection();
        changedConclusion = null;

        ViewportWidthPanel body = new ViewportWidthPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG);
        body.setBorder(new EmptyBorder(8, 0, 12, 8));

        body.add(buildFinalSummaryCard(finalSummarySnapshot, false));
        body.add(Box.createVerticalStrut(12));

        JPanel conclusionCard = cardPanel();
        conclusionCard.setLayout(new BoxLayout(conclusionCard, BoxLayout.Y_AXIS));
        conclusionCard.setAlignmentX(Component.CENTER_ALIGNMENT);
        JLabel title = label("CHANGE THE AI CONCLUSION", 12, Font.BOLD, ACCENT);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);
        conclusionCard.add(title);
        conclusionCard.add(Box.createVerticalStrut(7));
        JTextArea prompt = createTextArea();
        prompt.setText(
                "Choose the conclusion you would submit instead. You may name one cause, keep two causes in play while leaning one way, choose another candidate, or refuse to rank a single cause.");
        prompt.setFont(new Font("SansSerif", Font.BOLD, 15));
        prompt.setForeground(TEXT);
        prompt.setAlignmentX(Component.LEFT_ALIGNMENT);
        prompt.setMaximumSize(new Dimension(Integer.MAX_VALUE, 70));
        conclusionCard.add(prompt);
        conclusionCard.add(Box.createVerticalStrut(10));

        for (String option : buildChangeConclusionOptions()) {
            JRadioButton radio = new JRadioButton(option);
            radio.setOpaque(false);
            radio.setForeground(TEXT);
            radio.setFont(new Font("SansSerif", Font.PLAIN, 14));
            radio.setFocusPainted(false);
            radio.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            radio.setAlignmentX(Component.LEFT_ALIGNMENT);
            changeConclusionGroup.add(radio);
            radio.addActionListener(e -> {
                changedConclusion = option;
                rebuildChangeReasoning(finalSummarySnapshot);
            });
            conclusionCard.add(radio);
            conclusionCard.add(Box.createVerticalStrut(5));
        }
        body.add(conclusionCard);
        body.add(Box.createVerticalStrut(12));

        changeReasoningContainer.setOpaque(false);
        changeReasoningContainer.removeAll();
        changeReasoningContainer.add(emptyReasoningPrompt(), BorderLayout.CENTER);
        changeReasoningContainer.setAlignmentX(Component.CENTER_ALIGNMENT);
        body.add(changeReasoningContainer);
        body.add(Box.createVerticalStrut(14));

        JPanel actions = new JPanel(new BorderLayout());
        actions.setOpaque(false);
        JButton back = secondaryButton("← CHANGE USE / CHANGE DECISION");
        back.addActionListener(e -> {
            finalDecisionMode = null;
            setFinalFlowContent(buildFinalDecisionStep());
        });
        JButton submit = primaryButton("LOCK MY CONCLUSION →");
        submit.addActionListener(e -> {
            if (changedConclusion == null || !finalBranchAnswers.containsKey(changeEvidenceGroup)
                    || !finalBranchAnswers.containsKey(changeReasonGroup)) {
                JOptionPane.showMessageDialog(this, "Pilih conclusion dan jawab follow-up yang muncul.",
                        "Belum lengkap", JOptionPane.WARNING_MESSAGE);
                return;
            }
            finishFinalDecision();
        });
        actions.add(back, BorderLayout.WEST);
        actions.add(submit, BorderLayout.EAST);
        body.add(actions);

        JScrollPane scroll = new JScrollPane(body);
        scroll.setBorder(null);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scroll.getVerticalScrollBar().setValue(0);
        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.setOpaque(false);
        wrapper.add(scroll, BorderLayout.CENTER);
        return wrapper;
    }

    private JPanel emptyReasoningPrompt() {
        JPanel p = cardPanel();
        p.setLayout(new BorderLayout());
        JTextArea text = createTextArea();
        text.setText(
                "Choose your changed conclusion above. The next questions will be generated from that exact choice.");
        text.setFont(new Font("SansSerif", Font.PLAIN, 14));
        text.setForeground(MUTED);
        text.setBorder(new EmptyBorder(8, 8, 8, 8));
        p.add(text, BorderLayout.CENTER);
        return p;
    }

    private List<String> buildChangeConclusionOptions() {
        String top = finalSummarySnapshot.top();
        String second = finalSummarySnapshot.second();
        String third = finalSummarySnapshot.third();
        List<String> options = new ArrayList<>();

        // Player may reject the AI ranking entirely and argue for ANY plausible causal
        // event.
        for (String candidate : List.of("Arya", "Bella", "Dimas", "Chris", "Leo")) {
            options.add(candidate + " is the single most likely cause");
        }

        // Or keep the AI's strongest competing theories while choosing a direction.
        options.add(top + " or " + second + " — lean toward " + top);
        options.add(top + " or " + second + " — lean toward " + second);
        if (finalSummarySnapshot.shape().equals("THREE_WAY") || finalSummarySnapshot.shape().equals("DUAL_CLOSE")) {
            options.add(top + ", " + second + ", and " + third + " should all remain open");
        }

        // Most epistemically cautious conclusion.
        options.add("Not enough evidence to rank one damage cause");
        return options;
    }

    private void rebuildChangeReasoning(FinalSummary summary) {
        finalBranchAnswers.remove(changeEvidenceGroup);
        finalBranchAnswers.remove(changeReasonGroup);
        changeEvidenceGroup.clearSelection();
        changeReasonGroup.clearSelection();

        JPanel stack = new JPanel();
        stack.setLayout(new BoxLayout(stack, BoxLayout.Y_AXIS));
        stack.setOpaque(false);

        String primary = primaryCandidateFromConclusion(changedConclusion, summary);
        String q1;
        List<String> evidenceOptions;
        if (changedConclusion.startsWith("Not enough evidence")) {
            q1 = "Which evidence gap is the strongest reason to refuse a single-cause ranking?";
            evidenceOptions = buildGapOptions();
        } else if (changedConclusion.contains(" or ")) {
            q1 = "You kept two causes in play. Which source detail best explains why " + primary
                    + " deserves the direction of your lean?";
            evidenceOptions = buildEvidenceOptions(primary);
        } else if (changedConclusion.contains("should all remain open")) {
            q1 = "You kept three causes open. Which gap makes a three-way conclusion defensible?";
            evidenceOptions = buildGapOptions();
        } else {
            q1 = "You replaced the AI's conclusion with " + primary
                    + ". Which source detail most strongly supports that choice?";
            evidenceOptions = buildEvidenceOptions(primary);
        }

        stack.add(
                dynamicQuestionCard("FOLLOW-UP 1", q1, changeEvidenceGroup, evidenceOptions, finalBranchAnswers, null));
        stack.add(Box.createVerticalStrut(12));
        stack.add(dynamicQuestionCard("FOLLOW-UP 2",
                "What are you rejecting or correcting in the AI's original Final Summary?",
                changeReasonGroup,
                buildChangeReasonOptions(changedConclusion, summary), finalBranchAnswers, null));

        changeReasoningContainer.removeAll();
        changeReasoningContainer.add(stack, BorderLayout.CENTER);
        changeReasoningContainer.revalidate();
        changeReasoningContainer.repaint();
    }

    private JPanel dynamicQuestionCard(String number, String question, ButtonGroup group,
            List<String> options, Map<ButtonGroup, String> destination,
            Runnable afterSelection) {
        JPanel card = cardPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel qLabel = label(number, 11, Font.BOLD, ACCENT);
        qLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        card.add(qLabel);
        card.add(Box.createVerticalStrut(7));

        JTextArea qText = createTextArea();
        qText.setText(question);
        qText.setFont(new Font("SansSerif", Font.BOLD, 16));
        qText.setForeground(TEXT);
        qText.setAlignmentX(Component.LEFT_ALIGNMENT);
        qText.setMaximumSize(new Dimension(Integer.MAX_VALUE, 90));
        card.add(qText);
        card.add(Box.createVerticalStrut(10));

        for (String option : options) {
            JRadioButton radio = new JRadioButton(option);
            radio.setOpaque(false);
            radio.setForeground(TEXT);
            radio.setFont(new Font("SansSerif", Font.PLAIN, 14));
            radio.setFocusPainted(false);
            radio.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            group.add(radio);
            radio.addActionListener(e -> {
                destination.put(group, option);
                if (afterSelection != null)
                    afterSelection.run();
            });
            radio.setAlignmentX(Component.LEFT_ALIGNMENT);
            card.add(radio);
            card.add(Box.createVerticalStrut(5));
        }
        return card;
    }

    private List<String> buildEvidenceOptions(String candidate) {
        List<String> options = new ArrayList<>();
        options.add(candidateStrongestEvidence(candidate));
        for (String other : List.of("Arya", "Bella", "Dimas", "Chris", "Leo")) {
            if (!other.equals(candidate) && options.size() < 4) {
                options.add(candidateStrongestEvidence(other));
            }
        }
        return rotateOptions(options,
                Math.max(0, List.of("Arya", "Bella", "Dimas", "Chris", "Leo").indexOf(candidate)));
    }

    private List<String> buildWeaknessOptions(String candidate) {
        List<String> options = new ArrayList<>();
        options.add(candidateWeakness(candidate));
        options.add("The 17:56 photo proves exactly when the lens cracked.");
        options.add("Every physical contact in the timeline was directly observed and inspected afterward.");
        options.add("Because the AI produced a numerical ranking, its top cause is already verified.");
        return rotateOptions(options,
                1 + Math.max(0, List.of("Arya", "Bella", "Dimas", "Chris", "Leo").indexOf(candidate)));
    }

    private List<String> buildGapOptions() {
        return List.of(
                "No one checks the lens condition between the plausible impact events, so the exact damage moment is never isolated.",
                "The camera's serial number is missing from the cleanup board.",
                "The return sheet uses 17:48 instead of 17:45.",
                "Bella carried the camera bag to another room.");
    }

    private List<String> buildChangeReasonOptions(String conclusion, FinalSummary summary) {
        String top = summary.top();
        String primary = primaryCandidateFromConclusion(conclusion, summary);
        List<String> options = new ArrayList<>();
        if (conclusion.startsWith("Not enough evidence") || conclusion.contains("should all remain open")) {
            options.add(
                    "The AI turned a relative ranking into a more decisive causal story than the source evidence can establish.");
        } else if (conclusion.contains(" or ")) {
            options.add(
                    "The AI ranking compresses uncertainty; the second theory has enough source support to remain explicitly in the conclusion.");
        } else if (!primary.equals(top)) {
            options.add("The AI gave too much weight to the Ask More evidence supporting " + top
                    + " compared with the corroboration supporting " + primary + ".");
        } else {
            options.add(
                    "I am narrowing the conclusion because the top-ranked theory has materially stronger support in my chosen sources.");
        }
        options.add("The AI summary must be wrong because AI summaries are always unreliable.");
        options.add("I prefer a different answer even if the original sources do not support it.");
        options.add("The latest person interviewed should automatically be treated as the cause.");
        return rotateOptions(options, 2);
    }

    private List<String> rotateOptions(List<String> source, int shift) {
        List<String> copy = new ArrayList<>(source);
        if (copy.isEmpty())
            return copy;
        Collections.rotate(copy, shift % copy.size());
        return copy;
    }

    private boolean hasCollectedSupport(String candidate) {
        return switch (candidate) {
            case "Arya" -> interviewed.contains("Arya") || interviewed.contains("Kevin");
            case "Bella" -> interviewed.contains("Bella") || interviewed.contains("Fajar");
            case "Dimas" -> interviewed.contains("Dimas") || interviewed.contains("Rafi");
            case "Chris" -> interviewed.contains("Chris") || interviewed.contains("Nina");
            case "Leo" -> interviewed.contains("Leo") || interviewed.contains("Maya");
            default -> false;
        };
    }

    private String candidateStrongestEvidence(String candidate) {
        return switch (candidate) {
            case "Arya" -> askedMore.contains("Kevin")
                    ? "Kevin directly recalls the camera body contacting the metal railing before Arya signed the return sheet."
                    : askedMore.contains("Arya")
                            ? "Arya admits the camera swung into the railing before he left it at the documentation table."
                            : interviewed.contains("Kevin")
                                    ? "Kevin reports a hard-object-to-metal sound while Arya still had the camera and saw Arya stop to inspect it."
                                    : interviewed.contains("Arya")
                                            ? "Arya was the last recorded user and still had physical custody shortly before the return entry."
                                            : "No meaningful Arya-path evidence was collected in this run.";
            case "Bella" -> askedMore.contains("Fajar")
                    ? "Fajar says he saw Bella holding the camera just after it contacted the table edge."
                    : askedMore.contains("Bella")
                            ? "Bella admits she lifted the camera and it contacted the table edge while she freed the bag strap."
                            : interviewed.contains("Fajar")
                                    ? "Fajar heard a small impact while Bella was manipulating items around the camera bag and camera."
                                    : interviewed.contains("Bella")
                                            ? "Bella physically handled the bag area and interacted with the camera while freeing the strap."
                                            : "No meaningful Bella-path evidence was collected in this run.";
            case "Dimas" -> askedMore.contains("Rafi")
                    ? "Rafi describes a camera-shaped black object in Dimas's pile and a heavy sound as the pile entered the crate."
                    : askedMore.contains("Dimas")
                            ? "Dimas says several items were placed into the crate together and collided inside it."
                            : interviewed.contains("Rafi")
                                    ? "The 17:56 photo shows the camera on the table, then Rafi sees Dimas move a pile from that table before the crate is closed."
                                    : interviewed.contains("Dimas")
                                            ? "Dimas handled the documentation table during the window in which loose equipment was transferred toward the crate."
                                            : "No meaningful Dimas-path evidence was collected in this run.";
            case "Chris" -> askedMore.contains("Nina")
                    ? "Nina says the doorway impact made the crate rebound and she heard the contents shift inside."
                    : askedMore.contains("Chris")
                            ? "Chris says the doorway impact was strong enough to make him stop immediately."
                            : interviewed.contains("Nina")
                                    ? "Nina independently witnesses the closed crate strike the doorway while the camera is already inside."
                                    : interviewed.contains("Chris")
                                            ? "Chris transported the closed crate after the camera had most likely entered it."
                                            : "No meaningful Chris-path evidence was collected in this run.";
            case "Leo" -> askedMore.contains("Maya")
                    ? "Maya says the fallen tripod ended in contact with the crate after the second impact."
                    : askedMore.contains("Leo")
                            ? "Leo says a tripod leg ended against the crate and the crate appeared to have shifted."
                            : interviewed.contains("Maya")
                                    ? "Maya independently hears a later impact and sees the fallen tripod beside the crate."
                                    : interviewed.contains("Leo")
                                            ? "Leo reports a tripod falling toward the crate after it reached multimedia."
                                            : "No meaningful Leo-path evidence was collected in this run.";
            default -> "The available statements provide only indirect support for this theory.";
        };
    }

    private String candidateWeakness(String candidate) {
        return switch (candidate) {
            case "Arya" ->
                "No source inspects the lens immediately after the railing contact, so the contact is real but its effect on the lens is inferred.";
            case "Bella" ->
                "The table-edge contact is plausible, but nobody documents the lens condition immediately before and after Bella handles the camera.";
            case "Dimas" ->
                "The movement into the crate is strongly reconstructed, but objects colliding in the crate does not show that the lens cracked during cleanup.";
            case "Chris" ->
                "The doorway impact is well corroborated, but nobody checks the lens before the later tripod event, so causation is still inferred from sequence.";
            case "Leo" ->
                "The later tripod event is corroborated, but direct tripod-to-lens damage is never observed and the lens may already have been cracked earlier.";
            default -> "The theory depends on inference beyond what was directly observed.";
        };
    }

    private String primaryCandidateFromConclusion(String conclusion, FinalSummary summary) {
        if (conclusion == null)
            return summary.top();
        if (conclusion.startsWith("Not enough evidence"))
            return summary.top();
        if (conclusion.contains("lean toward ")) {
            return conclusion.substring(conclusion.indexOf("lean toward ") + "lean toward ".length()).trim();
        }
        for (String c : List.of("Arya", "Bella", "Dimas", "Chris", "Leo")) {
            if (conclusion.startsWith(c + " ") || conclusion.equals(c))
                return c;
        }
        return summary.top();
    }

    private String correctBranchEvidenceAnswer() {
        if (finalDecisionMode.equals("USE")) {
            String target = finalSummarySnapshot.shape().equals("SINGLE")
                    ? finalSummarySnapshot.top()
                    : finalSummarySnapshot.second();
            return candidateStrongestEvidence(target);
        }
        if (changedConclusion == null)
            return "";
        if (changedConclusion.startsWith("Not enough evidence")
                || changedConclusion.contains("should all remain open")) {
            return buildGapOptions().get(0);
        }
        return candidateStrongestEvidence(primaryCandidateFromConclusion(changedConclusion, finalSummarySnapshot));
    }

    private String correctBranchReasonAnswer() {
        if (finalDecisionMode.equals("USE")) {
            return candidateWeakness(finalSummarySnapshot.top());
        }
        return buildChangeReasonOptions(changedConclusion, finalSummarySnapshot).stream()
                .filter(o -> !o.contains("always unreliable") && !o.startsWith("I prefer")
                        && !o.startsWith("The latest person"))
                .findFirst().orElse("");
    }

    private void finishFinalDecision() {
        gameFinished = true;
        rebuildRevealScreen();
        rootLayout.show(root, "REVEAL");
    }

    // ============================================================
    // REVEAL SCREEN
    // ============================================================

    private JPanel buildRevealScreen() {
        JPanel placeholder = new JPanel(new BorderLayout());
        placeholder.setBackground(BG);
        placeholder.add(label("Reveal", 20, Font.BOLD, TEXT), BorderLayout.CENTER);
        return placeholder;
    }

    private void rebuildRevealScreen() {
        Component old = findRevealComponent();
        if (old != null)
            root.remove(old);

        JPanel page = new JPanel(new BorderLayout(16, 16));
        page.setBackground(BG);
        page.setBorder(new EmptyBorder(24, 28, 24, 28));

        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.Y_AXIS));
        header.setOpaque(false);
        header.add(label("RECONSTRUCTION RESULT", 30, Font.BOLD, TEXT));
        header.add(Box.createVerticalStrut(4));
        header.add(label(
                "There is no secret culprit reveal. The result evaluates how well your conclusion matches the evidence you chose to trust.",
                14, Font.PLAIN, MUTED));
        page.add(header, BorderLayout.NORTH);

        JPanel content = new JPanel(new GridLayout(1, 2, 14, 0));
        content.setOpaque(false);
        content.add(buildTimelineCard());
        content.add(buildResultCard());
        page.add(content, BorderLayout.CENTER);

        JPanel footer = new JPanel(new BorderLayout());
        footer.setOpaque(false);
        JButton review = secondaryButton("REVIEW CASE");
        review.addActionListener(e -> {
            gameFinished = false;
            rootLayout.show(root, "INVESTIGATION");
        });
        JButton restart = primaryButton("PLAY AGAIN");
        restart.addActionListener(e -> resetGame());
        footer.add(review, BorderLayout.WEST);
        footer.add(restart, BorderLayout.EAST);
        page.add(footer, BorderLayout.SOUTH);

        root.add(page, "REVEAL");
        root.revalidate();
        root.repaint();
    }

    private Component findRevealComponent() {
        Component[] comps = root.getComponents();
        if (comps.length < 4)
            return null;
        return comps[comps.length - 1];
    }

    private JPanel buildTimelineCard() {
        JPanel card = cardPanel();
        card.setLayout(new BorderLayout(0, 12));

        JPanel head = new JPanel();
        head.setOpaque(false);
        head.setLayout(new BoxLayout(head, BoxLayout.Y_AXIS));
        head.add(label("RECONSTRUCTED EVIDENCE TIMELINE", 14, Font.BOLD, ACCENT));
        head.add(Box.createVerticalStrut(4));
        head.add(label("The movement is reconstructable. The exact damage moment is not directly observed.", 11,
                Font.PLAIN, MUTED));
        card.add(head, BorderLayout.NORTH);

        JTextArea timeline = createTextArea();
        timeline.setOpaque(true);
        timeline.setBackground(PANEL_2);
        timeline.setBorder(new EmptyBorder(18, 18, 18, 18));
        timeline.setFont(new Font("Monospaced", Font.PLAIN, 13));
        timeline.setForeground(TEXT);
        timeline.setText("""
                17:45  Arya finishes using the camera

                ~17:46 Camera swings into a metal railing while Arya still has it
                       POSSIBLE DAMAGE EVENT • no lens inspection follows

                17:48  Arya signs the return record
                       Camera is actually left on the documentation table

                ~17:52 Bella frees the camera-bag strap
                       Camera contacts the table edge
                       POSSIBLE DAMAGE EVENT • no lens inspection follows

                17:56  PHOTO: camera still visible on the documentation table
                       The photo proves LOCATION, not lens condition

                ~18:03 Dimas clears loose equipment into the gray crate
                       Camera most likely enters with other items
                       POSSIBLE DAMAGE EVENT • items collide inside crate

                18:06  Table clear • gray crate closed

                18:10  Chris transports the closed crate

                18:11  Crate strikes the doorway
                       POSSIBLE DAMAGE EVENT • no lens inspection follows

                ~18:20 A tripod falls toward / against the crate
                       POSSIBLE DAMAGE EVENT • no lens inspection follows

                18:28  PHOTO: tripod beside the still-closed crate

                NEXT    Camera found in crate with cracked lens

                KEY GAP No one documented the lens condition between these events.
                """);
        timeline.setCaretPosition(0);

        JScrollPane scroll = new JScrollPane(timeline);
        scroll.setBorder(new LineBorder(new Color(55, 61, 72), 1, true));
        scroll.getViewport().setBackground(PANEL_2);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        card.add(scroll, BorderLayout.CENTER);
        return card;
    }

    private JPanel buildResultCard() {
        JPanel outer = cardPanel();
        outer.setLayout(new BorderLayout(0, 10));

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        top.add(label("YOUR FINAL DECISION", 14, Font.BOLD, ACCENT), BorderLayout.WEST);
        top.add(label(finalDecisionMode == null ? "—" : finalDecisionMode, 12, Font.BOLD,
                "CHANGE".equals(finalDecisionMode) ? WARNING : SUCCESS), BorderLayout.EAST);
        outer.add(top, BorderLayout.NORTH);

        ViewportWidthPanel body = new ViewportWidthPanel();
        body.setLayout(new GridBagLayout());
        body.setBackground(PANEL);
        body.setBorder(new EmptyBorder(2, 0, 10, 6));
        GridBagConstraints g = new GridBagConstraints();
        g.gridx = 0;
        g.weightx = 1;
        g.fill = GridBagConstraints.HORIZONTAL;
        g.anchor = GridBagConstraints.NORTHWEST;
        g.insets = new Insets(0, 0, 12, 0);

        String playerConclusion = "USE".equals(finalDecisionMode)
                ? finalSummarySnapshot.conclusion()
                : changedConclusion;

        String pickedEvidence;
        String pickedReason;
        if ("USE".equals(finalDecisionMode)) {
            pickedEvidence = finalBranchAnswers.get(useEvidenceGroup);
            pickedReason = finalBranchAnswers.get(useWeaknessGroup);
        } else {
            pickedEvidence = finalBranchAnswers.get(changeEvidenceGroup);
            pickedReason = finalBranchAnswers.get(changeReasonGroup);
        }
        boolean evidenceAligned = Objects.equals(pickedEvidence, correctBranchEvidenceAnswer());
        boolean reasoningAligned = Objects.equals(pickedReason, correctBranchReasonAnswer());

        String assessmentLabel;
        String assessmentText;
        Color assessmentColor;
        if (playerConclusion != null && playerConclusion.startsWith("Not enough evidence")) {
            assessmentLabel = evidenceAligned && reasoningAligned
                    ? "BEST-SUPPORTED CAUTION"
                    : "CAUTIOUS CONCLUSION — SUPPORT CAN BE STRONGER";
            assessmentText = "No source checks the lens between the plausible damage events. If your standard is 'what can I actually establish?', refusing to name one cause is the strongest conclusion. "
                    +
                    "This does not mean Arya, Bella, Dimas, Chris, or Leo are equally likely; it means the evidence never isolates one event as the damage moment.";
            assessmentColor = SUCCESS;
        } else if (playerConclusion != null
                && (playerConclusion.contains(" or ") || playerConclusion.contains("should all remain open"))) {
            assessmentLabel = evidenceAligned && reasoningAligned
                    ? "DEFENSIBLE COMPARATIVE JUDGMENT"
                    : "PLAUSIBLE COMPARISON — CHECK YOUR SUPPORT";
            assessmentText = "Keeping more than one causal path alive is reasonable because several physical contacts really happened and none was followed by a lens inspection. "
                    +
                    "Your lean is a judgment about relative plausibility, not a proven culprit.";
            assessmentColor = ACCENT;
        } else {
            String candidate = primaryCandidateFromConclusion(playerConclusion, finalSummarySnapshot);
            if (!hasCollectedSupport(candidate)) {
                assessmentLabel = "UNSUPPORTED LEAP";
                assessmentText = "You named " + candidate
                        + ", but your investigation path did not collect a meaningful source for that causal theory. " +
                        "Changing the AI is allowed, but the replacement still needs to be grounded in evidence you actually gathered.";
                assessmentColor = DANGER;
            } else {
                assessmentLabel = evidenceAligned
                        ? "DEFENSIBLE HYPOTHESIS"
                        : "PLAUSIBLE HYPOTHESIS — WEAKLY GROUNDED";
                assessmentText = candidate
                        + " can be argued as the most likely cause if you give appropriate weight to the evidence you collected. "
                        +
                        "But naming " + candidate
                        + " is still a probabilistic judgment: the case contains no observation proving that the crack first appeared at that event.";
                assessmentColor = evidenceAligned ? SUCCESS : WARNING;
            }
        }

        int row = 0;
        g.gridy = row++;
        body.add(resultSection(
                "1 • THE AI SUMMARY YOU SAW",
                finalSummarySnapshot.conclusion() + "\n\n" +
                        "Ask More used: " + (askedMore.isEmpty() ? "none" : String.join(" • ", askedMore)) + "\n\n" +
                        "AI relative ranking: " + finalSummarySnapshot.top() + " " + finalSummarySnapshot.topPct()
                        + "%  •  " +
                        finalSummarySnapshot.second() + " " + finalSummarySnapshot.secondPct() + "%  •  " +
                        finalSummarySnapshot.third() + " " + finalSummarySnapshot.thirdPct() + "%\n\n" +
                        "The ranking is a simulated best-guess from the context supplied in this run. It is not proof.",
                ACCENT), g);

        g.gridy = row++;
        body.add(resultSection(
                "2 • WHAT YOU SUBMITTED",
                ("USE".equals(finalDecisionMode)
                        ? "You chose to USE the AI summary."
                        : "You chose to CHANGE the AI summary before submitting it.") +
                        "\n\nYour conclusion:\n" + playerConclusion,
                "USE".equals(finalDecisionMode) ? SUCCESS : WARNING), g);

        g.gridy = row++;
        body.add(resultSection(
                "3 • " + assessmentLabel,
                assessmentText + "\n\n" +
                        "Evidence you relied on:\n" + nullSafe(pickedEvidence) + "\n\n" +
                        "How you treated the AI conclusion:\n" + nullSafe(pickedReason),
                assessmentColor), g);

        g.gridy = row++;
        body.add(resultSection(
                "4 • WHY YOUR ASK MORE CHOICES CHANGED THE AI",
                buildAskMoreImpactExplanation(),
                ACCENT), g);

        g.gridy = row++;
        body.add(resultSection(
                "5 • WHAT THE CASE CAN ACTUALLY ESTABLISH",
                "The camera's movement is much clearer than the damage event: it remained on the documentation table at 17:56, most likely entered the gray crate during Dimas's cleanup, and was later transported by Chris.\n\n"
                        +
                        "For the cracked lens, several real or strongly supported contacts exist: Arya's railing contact, Bella's table-edge contact, collisions during cleanup, Chris's doorway impact, and the later tripod event. No one records the lens condition between them. There is intentionally NO secret culprit reveal.\n\n"
                        +
                        "Therefore, 'Not enough evidence to identify one cause' is the most evidence-disciplined answer. A named person can still be a reasonable BEST GUESS if the reasoning is explicit and the uncertainty is understood.",
                WARNING), g);

        g.gridy = row++;
        body.add(resultSection(
                "6 • AI LITERACY TAKEAWAY",
                "AI systems generate outputs from the context available to them and tend to favor patterns or explanations that look most plausible. In this game, your interview choices AND the Ask More details you chose to collect determine that context. Skipping a source does not make the run invalid; it means the AI is reasoning from a narrower slice of the case.\n\n"
                        +
                        "The important skill is not 'never trust AI' and not 'always override AI'. It is knowing what role the output is playing. A summary can be an excellent navigation tool and a useful best guess, while still being more confident than the underlying evidence deserves.\n\n"
                        +
                        "Use the AI to organize possibilities. Then decide for yourself whether the task needs a probable answer, a cautious answer, or verification from the original source.",
                ACCENT), g);

        g.gridy = row;
        g.weighty = 1;
        body.add(Box.createVerticalGlue(), g);

        JScrollPane scroll = new JScrollPane(body);
        scroll.setBorder(null);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scroll.getVerticalScrollBar().setValue(0);
        SwingUtilities.invokeLater(() -> scroll.getVerticalScrollBar().setValue(0));
        outer.add(scroll, BorderLayout.CENTER);
        return outer;
    }

    private String buildAskMoreImpactExplanation() {
        StringBuilder out = new StringBuilder();
        out.append("You completed ").append(interviewed.size()).append(" of ").append(characters.size())
                .append(" interviews and used ")
                .append(askedMore.size()).append(" of 3 Ask More opportunities.\n\n");
        if (askedMore.isEmpty()) {
            out.append(
                    "You did not use Ask More. The AI therefore relied on the initial wording of each source you heard, leaving more of their ambiguity unresolved.\n\n");
        } else {
            out.append("Ask More used: ").append(String.join(" • ", askedMore)).append(".\n\n");
        }
        for (String key : askedMore) {
            out.append("• ").append(key).append(": ").append(askMoreEffect(key)).append("\n");
        }
        out.append("\nThe resulting AI ranking put ").append(finalSummarySnapshot.top())
                .append(" first. Different interview paths, fewer or more follow-ups, and different Ask More targets can strengthen a different causal path — Arya, Bella, Dimas, Chris, or Leo — and can also produce a two-way or three-way Final Summary. ")
                .append("The AI is being consistent with the context it received; that does not make its top-ranked explanation proven.");
        return out.toString();
    }

    private String askMoreEffect(String key) {
        return switch (key) {
            case "Arya" ->
                "adds Arya's own admission that the camera hit the railing before return, strengthening the Arya theory.";
            case "Kevin" ->
                "adds independent corroboration of camera-to-railing contact, strongly strengthening the Arya theory.";
            case "Bella" ->
                "adds Bella's admission that she lifted the camera and it hit the table edge, strengthening the Bella theory.";
            case "Fajar" ->
                "adds outside corroboration of Bella's table-edge contact, strongly strengthening the Bella theory.";
            case "Siska" ->
                "clarifies that the 17:56 photo cannot reveal lens condition, so it cannot eliminate Arya or Bella as earlier damage possibilities.";
            case "Dimas" ->
                "adds item-to-item collision inside the crate during cleanup, strengthening Dimas as a possible damage event.";
            case "Rafi" ->
                "makes it more likely the camera-shaped object was in Dimas's pile and records a heavy sound entering the crate.";
            case "Chris" ->
                "adds Chris's description of a doorway impact strong enough to make him stop, strengthening Chris.";
            case "Nina" ->
                "adds independent detail that the crate rebounded and contents shifted, strongly strengthening Chris.";
            case "Leo" ->
                "makes physical tripod-to-crate contact more plausible, strengthening Leo's later-event theory.";
            case "Maya" ->
                "adds independent support that the tripod ended against the crate after the second impact, strengthening Leo's theory.";
            default -> "adds context to one causal path.";
        };
    }

    private String nullSafe(String value) {
        return value == null ? "—" : value;
    }

    private JPanel resultSection(String title, String text, Color accent) {
        JPanel section = new JPanel(new BorderLayout(0, 8));
        section.setBackground(new Color(30, 39, 52));
        section.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(62, 78, 104), 1, true),
                new EmptyBorder(12, 13, 12, 13)));
        section.setMinimumSize(new Dimension(0, 0));

        JTextArea titleArea = createTextArea();
        titleArea.setText(title);
        titleArea.setFont(new Font("SansSerif", Font.BOLD, 11));
        titleArea.setForeground(accent);
        titleArea.setOpaque(false);
        titleArea.setRows(1);
        titleArea.setMinimumSize(new Dimension(0, 20));
        section.add(titleArea, BorderLayout.NORTH);

        JTextArea area = createTextArea();
        area.setText(text);
        area.setFont(new Font("SansSerif", Font.PLAIN, 13));
        area.setForeground(TEXT);
        area.setOpaque(true);
        area.setBackground(new Color(30, 39, 52));
        area.setBorder(null);
        area.setRows(Math.max(4, Math.min(18, text.length() / 78)));
        area.setMinimumSize(new Dimension(0, 0));
        section.add(area, BorderLayout.CENTER);
        return section;
    }

    private void resetGame() {
        interviewed.clear();
        askedMore.clear();
        unlockedEvidence.clear();
        askMoreRemaining = 3;
        secondsRemaining = INVESTIGATION_SECONDS;
        investigationStarted = false;
        investigationClosed = false;
        investigationTimer.stop();
        selectedCharacter = "Arya";
        originalTabViewed = false;
        gameFinished = false;
        selectedAnswers.clear();
        noteHistory.clear();
        lastRecordedSynthesis = "";
        q1Group.clearSelection();
        q2Group.clearSelection();
        q3Group.clearSelection();
        q4Group.clearSelection();
        q5Group.clearSelection();
        finalDecisionMode = null;
        changedConclusion = null;
        finalSummarySnapshot = null;
        finalBranchAnswers.clear();
        changeConclusionGroup.clearSelection();
        useEvidenceGroup.clearSelection();
        useWeaknessGroup.clearSelection();
        changeEvidenceGroup.clearSelection();
        changeReasonGroup.clearSelection();
        statusLine.setText(" ");
        statusLine.setForeground(SUCCESS);
        notebookTabs.setSelectedIndex(0);
        refreshAll();
        rootLayout.show(root, "START");
    }

    // ============================================================
    // UI HELPERS
    // ============================================================

    private static JPanel cardPanel() {
        JPanel p = new JPanel();
        p.setBackground(PANEL);
        p.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(49, 54, 64), 1, true),
                new EmptyBorder(14, 14, 14, 14)));
        return p;
    }

    private static JLabel label(String text, int size, int style, Color color) {
        JLabel l = new JLabel(text);
        l.setFont(new Font("SansSerif", style, size));
        l.setForeground(color);
        return l;
    }

    private static JTextArea createTextArea() {
        JTextArea area = new JTextArea();
        area.setEditable(false);
        area.setLineWrap(true);
        area.setWrapStyleWord(true);
        area.setOpaque(false);
        area.setBorder(null);
        area.setFocusable(false);
        return area;
    }

    private static JScrollPane transparentScroll(Component view) {
        JScrollPane scroll = new JScrollPane(view);
        scroll.setBorder(null);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        return scroll;
    }

    private static JButton primaryButton(String text) {
        JButton b = new JButton(text);
        stylePrimary(b);
        return b;
    }

    private static JButton secondaryButton(String text) {
        JButton b = new JButton(text);
        styleSecondary(b);
        return b;
    }

    private static void stylePrimary(JButton b) {
        b.setBackground(ACCENT);
        b.setForeground(new Color(10, 18, 30));
        b.setFont(new Font("SansSerif", Font.BOLD, 13));
        b.setFocusPainted(false);
        b.setBorder(new EmptyBorder(11, 16, 11, 16));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
    }

    private static void styleSecondary(JButton b) {
        b.setBackground(PANEL_2);
        b.setForeground(TEXT);
        b.setFont(new Font("SansSerif", Font.BOLD, 13));
        b.setFocusPainted(false);
        b.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(70, 77, 90), 1, true),
                new EmptyBorder(10, 15, 10, 15)));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
    }

    private static void styleMini(JButton b) {
        b.setBackground(PANEL_2);
        b.setForeground(TEXT);
        b.setFont(new Font("SansSerif", Font.BOLD, 10));
        b.setFocusPainted(false);
        b.setBorder(BorderFactory.createCompoundBorder(
                new LineBorder(new Color(67, 74, 87), 1, true),
                new EmptyBorder(7, 9, 7, 9)));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
    }

    private void showTextDialog(String title, String text) {
        JTextArea area = new JTextArea(text, 16, 52);
        area.setEditable(false);
        area.setLineWrap(true);
        area.setWrapStyleWord(true);
        area.setFont(new Font("SansSerif", Font.PLAIN, 15));
        area.setBackground(new Color(245, 246, 248));
        area.setBorder(new EmptyBorder(12, 12, 12, 12));
        JScrollPane scroll = new JScrollPane(area);
        scroll.setBorder(null);
        JOptionPane.showMessageDialog(this, scroll, title, JOptionPane.INFORMATION_MESSAGE);
    }

    // ============================================================
    // MODEL
    // ============================================================

    private record NoteRevision(String trigger, String synthesis) {
    }

    private record FinalSummary(
            String shape,
            String top,
            String second,
            String third,
            int topPct,
            int secondPct,
            int thirdPct,
            String conclusion,
            String narrative) {
    }

    private static class ViewportWidthPanel extends JPanel implements Scrollable {
        @Override
        public Dimension getPreferredScrollableViewportSize() {
            return getPreferredSize();
        }

        @Override
        public int getScrollableUnitIncrement(Rectangle visibleRect, int orientation, int direction) {
            return 18;
        }

        @Override
        public int getScrollableBlockIncrement(Rectangle visibleRect, int orientation, int direction) {
            return Math.max(80, visibleRect.height - 60);
        }

        @Override
        public boolean getScrollableTracksViewportWidth() {
            return true;
        }

        @Override
        public boolean getScrollableTracksViewportHeight() {
            return false;
        }
    }

    private record CharacterData(
            String name,
            String role,
            String whyInterview,
            String initialStatement,
            String askMoreQuestion,
            String askMoreAnswer) {
    }

    // ============================================================
    // MAIN
    // ============================================================

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
            } catch (Exception ignored) {
            }
            gamev7 game = new gamev7();
            game.setVisible(true);
        });
    }
}
